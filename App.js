import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gamestate: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]

      ],
      currentPlayer: 1,
    }
 
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({gamestate:
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0] 

      ],
      currentPlayer: 1,
    });
  }

  getWinner = () => {
    const NUM_Tiles = 3;
    var arr = this.state.gamestate;
    var sum;

    for (var i = 0; i < NUM_Tiles; i++){
      sum = arr[i][0] + arr [i][1] + arr[i][2];
      if(sum == 3) {return 1; }
      else if (sum == -3) {return -1; }

    }

    for (var i = 0; i < NUM_Tiles; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }

    }

    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    return 0;
  }

  onTilePress = (row, col) => {
    //don't allow change
    var value = this.state.gamestate[row][col];
    if (value !=0) {return; }

    //grab current player
    var currentPlayer = this.state.currentPlayer;

    //set to correct tile
    var arr = this.state.gamestate.slice();
    arr[row][col] = currentPlayer;
    this.setState({gamestate: arr});

    //switc to other player
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    //check winner
    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert("Player 1 is the winner");
      this.initializeGame();
    }
    else if (winner == -1){
      Alert.alert("Player 2 is the winner");
      this.initializeGame();
    }
  }

  onNewGamePress = () => {
    this.initializeGame();
  }

  renderIcon= (row, col) => {
    var value = this.state.gamestate[row][col];
    switch(value)
    {
      case 1: return <Icon name='close' style={styles.tileX} />;
      case -1: return <Icon name='circle-o' style={styles.tileO} />;
      default: return <View></View>
    }
  }

  

  render() {
    return (
      <View style= {styles.container}>

        <View style= {{flexDirection:"row"}}>
          <TouchableOpacity onPress={ () => this.onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => this.onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]} >
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => this.onTilePress(0, 2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]} >
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={ () => this.onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]} >
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => this.onTilePress(1, 1)} style={[styles.tile, {}]} >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => this.onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]} >
             {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={ () => this.onTilePress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]} >
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => this.onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]} >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => this.onTilePress(2, 2)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]} >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
    
        <View style={{ paddingTop: 50 }}/>
          <Button title="Start New Game" onPress= {this.onNewGamePress}/>


      </View>



    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileX: {
    color: 'red',
    fontSize: 60,
  },
  tileO: {
    color: 'green',
    fontSize: 60,
  },
  
});

