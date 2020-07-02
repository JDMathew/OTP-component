import React, { Component, useRef, useState } from "react";
import "./styles.css";

const CODE_LENGTH = new Array(6).fill(0);

const App = () => {
  const input = React.useRef();
  const [state, setState] = useState({
    value: "",
    focused: false
  });

  const handleClick = () => {
    input.current.focus();
  };
  const handleFocus = () => {
    setState({ focused: true });
  };
  const handleBlur = () => {
    setState({
      focused: false
    });
  };
  const handleKeyUp = e => {
    if (e.key === "Backspace") {
      setState(state => {
        return {
          value: state.value.slice(0, state.value.length - 1)
        };
      });
    }
  };
  const handleChange = e => {
    const value = e.target.value;

    setState(state => {
      if (state.value.length >= CODE_LENGTH.length) return null;
      return {
        value: (state.value + value).slice(0, CODE_LENGTH.length)
      };
    });
  };

  const { value, focused } = state;

  const values = value.split("");

  const selectedIndex =
    values.length < CODE_LENGTH.length ? values.length : CODE_LENGTH.length - 1;

  const hideInput = !(values.length < CODE_LENGTH.length);

  return (
    <div className="App">
      <div className="wrap" onClick={handleClick}>
        <input
          value=""
          ref={input}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="input"
          style={{
            width: "32px",
            top: "0px",
            bottom: "0px",
            left: `${selectedIndex * 32}px`,
            opacity: hideInput ? 0 : 1
          }}
        />
        {CODE_LENGTH.map((v, index) => {
          const selected = values.length === index;
          const filled =
            values.length === CODE_LENGTH.length &&
            index === CODE_LENGTH.length - 1;

          return (
            <div className="display">
              {values[index]}
              {(selected || filled) && focused && <div className="shadows" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
