import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageURI: "https://juiceboxinteractive.com/app/uploads/2018/06/1950s-Color-Palette.png",
      progress: 0,
      payload : null,
      success : true
    }
  }

  onImageUriChange = (e) => {
    this.setState({
      imageURI: e.target.value
    })
  }

  findColor = () => {
    this.setState({
      progress: 1
    })

    let data = {
      image: this.state.imageURI
    }
    fetch('https://us-central1-dominatingcolor.cloudfunctions.net/hello  ', {
      method: 'post',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json();
    }).then((res) => {
      console.log(res)
      this.setState({
        payload : res,
        progress: 2
      })
    }).catch(e => {
      this.setState({
        success : false
      })
    })
  }

  render() {
    return (
      <div className="App">
        {
          (this.state.progress === 0) ?
            <header className="App-header">
              <h1 className="logo">Dominato</h1>
              <input onChange={this.onImageUriChange} className="imageURI" placeholder="Image URI.." />
              <div className="findBtn" onClick={this.findColor}>Find</div>
            </header>
            :
            (this.state.progress === 1) ?
              <header className="App-header">
                {this.state.success ? 
                <h1 className="loading">Loading..</h1>
              :
              <div>
              <h1 className="loading">Error!! Invalid URI</h1>
              </div>
              }
              </header>
              :
              <header className="App-header">
                
                <img className="image" src={this.state.imageURI} alt="color"/>
                <div className="dominating-colors">
                  {
                    this.state.payload.color.map((each, k) => {
                        return <div className="colors" style={{backgroundColor: "rgb("+ each.color.red + ", " + each.color.green + ", " + each.color.blue +")" , width: each.score * 100 + "%", height: "100%" }}> 
                        </div>
                    })
                  }
                </div>
              </header>
        }
      </div>
    );
  }
}

export default App;
