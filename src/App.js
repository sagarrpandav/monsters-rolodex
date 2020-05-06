import React, {Component} from 'react';
import './App.css';
import {CardList} from "./components/card-list/card-list.component";
import {SearchBox} from "./components/search-box/search-box.component";

class App extends Component {

    constructor() {
        super();
        this.state = {
            monsters: [],
            searchField: ''
        };

        //this.handleChange = this.handleChange.bind(this); Needed if arrow func not used
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                return res.json();
            })
            .then(userData => {
                this.setState({monsters: userData})
            })
            .catch(err => {
                throw err;
            });
    }

    handleChange = (event) => {
        this.setState({searchField: event.target.value})
    };

    render() {
        const {monsters, searchField} = this.state;
        const filteredMonsters = monsters.filter(monster => {
            return monster.name.toLowerCase().includes(searchField.toLowerCase());
        });

        return (
            <div className="App">
                <h1>Monsters Rolodex</h1>
                <SearchBox
                    placeHolder='Search Monsters'
                    handleChange={this.handleChange}/>
                <CardList monsters={filteredMonsters}/>
            </div>
        );
    }
}

export default App;
