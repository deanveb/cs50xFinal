from flask import Flask, render_template, redirect, request
from flask_session import Session
from sqlite3 import SQL

from helper import login_required

app = Flask("__name__")
app.run(debug=True)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"]) 
def login():
    if request.method == "GET":
        return render_template("login.html")
    else:
        # TODO
        # Get data
        # check confirm in js
        # add to sqlite3
        return redirect("/")