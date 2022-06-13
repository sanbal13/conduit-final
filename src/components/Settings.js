function Settings() {
  return (
    <div className="container settings">
      <center>
        <h2>Your Settings</h2>
      </center>
      <form className="settingsForm flex flex-column">
        <input
          type="text"
          name="image"
          id="image"
          placeholder="URL of profile picture"
        />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
        />
        <textarea
          name="bio"
          id="bio"
          cols="30"
          rows="10"
          placeholder="Short bio about you"
        ></textarea>
        <input type="text" name="email" id="email" placeholder="Email" />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="New Password"
        />
        <input type="submit" value="Update Settings" />
      </form>
    </div>
  );
}
export default Settings;
