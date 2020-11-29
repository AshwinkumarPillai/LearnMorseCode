import React, { Component } from "react";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(localStorage.getItem("user"));
    this.state = { user };
  }

  loggedOut = () => {
    this.setState({ user: null });
  };

  loggedIn = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    this.setState({ user });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          user: this.state.user,
          loggedIn: this.loggedIn,
          loggedOut: this.loggedOut,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
