def is_type(num : str, get_type : type) -> bool:
    try:
        get_type(num)
    except ValueError:
        return False
    return True