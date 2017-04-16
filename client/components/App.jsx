import React from 'react';
import orc from 'raw-loader!../races/orc.txt';
import dwarfMale from 'raw-loader!../races/dwarfMale.txt';
import dwarfFemale from 'raw-loader!../races/dwarfFemale.txt';
var gen = require('./generator.js');

export default class App extends React.Component {      
	constructor(props) {
		super();
		this.state = {
			genName: '',
			race: 'orc',
			gender: 'male'
		};
	}

	onGenerate(e) {
		var file;
		switch(this.state.race + '-' + this.state.gender){
			case 'orc-male':
			case 'orc-female':
				file = orc;
				break;
			case 'dwarf-male':
				file = dwarfMale;
				break;
			case 'dwarf-female':
				file = dwarfFemale;
				break;	
		}

		this.setState({
			genName: gen.generate(file.split(' '), 10, 250)
		});
	}

	handleRaceChange(e){
		this.setState({
			race: e.target.value
		});
	}

	handleGenderChange(e){
		this.setState({
			gender: e.target.value
		});
	}

	render() {
	    return (
  	   	<div style={styles.container}>
			<div style={styles.header}>
				<p style={styles.title}>Character Name Generator</p>
				<p> Just a simple character name generator, so you don't have to pick a name like "Chop chop" </p>
			</div>
			<div style={styles.pickerCont}>	
				<label> Pick a character race: &nbsp; 
					<select value={this.state.race} onChange={this.handleRaceChange.bind(this)}>
						<option value='orc'> Orc </option>
						<option value='dwarf'> Dwarf </option>
					</select>	
				</label>
				&nbsp;
				<label>
					and gender: &nbsp;
					<select value={this.state.gender} onChange={this.handleGenderChange.bind(this)}>
						<option value='male'> Male </option>
						<option value='female'> Female </option>
					</select>
				</label>
				&nbsp;
				<label>
					and press &nbsp;
					<button type="button" onClick={this.onGenerate.bind(this)}> Generate! </button>
				</label>
			</div>
			<div style={styles.result}>
				<label style={styles.resultLabel}> {this.state.genName} </label>
			</div>
		</div>	
		);
  	}
}


const styles = {
	container: {
		textAlign: 'center',
		fontFamily: 'Helvetica',
	},

	header: {
		paddingBottom: '10px',
		fontSize: '14px'
	},

	title: {
		fontWeight: 'bold',
		fontSize: '34px'
	},

	pickerCont: {
		paddingBottom: '30px'
	},

	result: {

	},

	resultLabel: {
		padding: '10px',
		border: '1px solid #ccc'
	}
}
