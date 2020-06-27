import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {InMemoryCache} from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from "@apollo/react-hooks";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontsource-roboto';
import {setContext} from "apollo-link-context";
import {AUTH_TOKEN} from "./constants";
import {createHttpLink} from "apollo-link-http";

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    onError: ({networkError, graphQLErrors}) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)
    }
});

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
