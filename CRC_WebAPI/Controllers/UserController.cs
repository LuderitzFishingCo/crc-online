using System;
    public UserController(AppDBContext _appDBContext)
    {
      db = _appDBContext;
    }
      db.User.Add(newUser);

      return Ok();