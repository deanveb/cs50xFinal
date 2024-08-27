from cs50 import SQL
from flask import Flask, render_template, redirect, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from os import listdir
from helper import is_type

# export FLASK_DEBUG=1 && flask run

app = Flask("__name__")

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

db = SQL("sqlite:///app.db")

@app.route("/", methods=["GET"])
def index():
    try:
        name = session["name"]
    except KeyError:
        return redirect("/login")
    db_name = []
    tables = []
    datas = []
    # Load tables
    for i in listdir("/home/deanv/Project/cs50/Final Project/database"):
        subdb = SQL("sqlite:///"+ "database/" + i)
        db_name.append(i)
        tables.append(subdb.execute("SELECT name FROM sqlite_master WHERE type ='table'"))
        for table in tables[-1]:
            datas.append(subdb.execute("SELECT * FROM ?", table["name"]))
    # Construct query
    # TODO: Prevent open filter menu when not select anything
    if request.args.get("table"):
        subdb = SQL("sqlite:///"+ "database/" + request.args.get("db_name"))
        query = f"SELECT * FROM {request.args.get('table')} WHERE "
        for condition in request.args:
            value = request.args.get(condition)
            # Exclude key table, db_name
            if value and condition not in ["table", "db_name"]:
                # Convert value to correct datatype 
                # FIXME: a bunch of try and except
                # TODO: handle no input case
                types = [int, float]
                for i in types:
                    if is_type(value, i):
                        value = i(value)
                        break
                query += (f"{condition}='{request.args.get(condition)}' " 
                          if type(value) == str 
                          else f"{condition}={request.args.get(condition)} AND ")
        print(query, request.args.get("db_name"))
    # Execute query
        result = subdb.execute(query + ";")
        print(result)
    # display tables
    # TODO: update changed table
    return render_template("index.html",
                        username=name,
                        db_name=db_name,
                        tables=tables,
                        datas=datas)
        

@app.route("/login", methods=["GET", "POST"]) 
def login():
    if request.method == "GET":
        return render_template("login.html")
    else:
        session.clear()

        # Get data
        name = request.form.get("name")
        password = request.form.get("password")
        account = db.execute("SELECT * FROM users WHERE name = ?", name)   
        # Check for Error
        if (len(account)) == 0:
            return render_template("login.html", error="Account doesn't exist")  
        if not check_password_hash(account[0]["hash"], password):
            return render_template("login.html", error="Incorrect password")
        # Log in
        session["name"] = name

        #check if user can change page from browser
        return redirect("/")
    
# Only add logout in home
@app.route("/logout")
def logout():
    session.clear()
    return redirect("/login")

@app.route("/register", methods=["GET","POST"])
def register():
    if request.method == "GET":
        return render_template("register.html")
    else:
        name = request.form.get("name")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")
        account = db.execute("SELECT * FROM users WHERE name = ?", name)
        hash = generate_password_hash(password)
        # Check for error
        if not name or not password or not confirmation:
            return render_template("register.html", error="Invalid")
        if password != confirmation:
            return render_template("register.html", error="Password and confirm password must be the same")
        
        if len(account) != 0:
            return render_template("register.html", error="Username already exists")

        # Add to database
        db.execute("INSERT INTO users (name, hash) VALUES(?, ?)", name, hash)

        return redirect("/login")

@app.route("/about")
def about():
    return render_template("about.html")

# TODO: Check on workspace grid area

@app.route("/import")
def add():
    # https://stackoverflow.com/questions/65218421/send-data-returned-from-javascript-function-to-flask-backend
    return redirect("/")
