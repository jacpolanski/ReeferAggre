import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
import LoginPage from "../components/LoginPage";

export const Layout = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [users, setUsers] = useState([]);
  const [errMsg, setErrMsg] = useState("text-danger d-none");

  useEffect(() => {
    fetch("/api/users")
      .then((resp) => {
        if (resp.ok === true) return resp.json();
        else console.log("Wystąpił błąd");
      })
      .then((users) => setUsers(users));
  }, []);

  const handleLogin = (e, title, pass) => {
    e.preventDefault();

    const findUserPass = users.filter((user) => user.position === title);
    if (findUserPass[0].password === pass) {
      setLogin(true);
      setErrMsg("text-danger d-none");
    } else {
      setErrMsg("text-danger");
    }
  };

  return (
    <>
      <Head>
        <title>ReeferAggre</title>
        <meta
          name="ReeferAggre"
          content="Light-weight and quick daily Reefer readings aggregator with auto malfunction detection,
                        that also allows you to manually enter readings and custom Unit alarms. Additionally app
                        features export to excel capabilities."
        />
        <link rel="icon" href="./favicon.ico" />
      </Head>

      <header>{login && <NavBar />}</header>
      <main className=".main">
        {!login ? (
          <LoginPage users={users} handleSubmit={handleLogin} errMsg={errMsg} />
        ) : (
          children
        )}
      </main>
      <footer>{login && <Footer />}</footer>
    </>
  );
};
