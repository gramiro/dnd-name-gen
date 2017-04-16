import React from 'react';
import orc from 'raw-loader!../races/orc.txt';
import dwarfMale from 'raw-loader!../races/dwarfMale.txt';
import dwarfFemale from 'raw-loader!../races/dwarfFemale.txt';
import elveFemale from 'raw-loader!../races/elveFemale.txt';
import elveMale from 'raw-loader!../races/elveMale.txt';
import gnomeFemale from 'raw-loader!../races/gnomeFemale.txt';
import gnomeMale from 'raw-loader!../races/gnomeMale.txt';
import humanFemale from 'raw-loader!../races/humanFemale.txt';
import humanMale from 'raw-loader!../races/humanMale.txt';
import halflingFemale from 'raw-loader!../races/halflingFemale.txt';
import halflingMale from 'raw-loader!../races/halflingMale.txt';

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
			case 'elve-female':
				file = elveFemale;
				break;
			case 'elve-male':
				file = elveMale;
				break;
			case 'gnome-female':
				file = gnomeFemale;
				break;
			case 'gnome-male':
				file = gnomeMale;
				break;
			case 'human-male':
				file = humanMale;
				break;
			case 'human-female':
				file = humanFemale;
				break;
			case 'halfling-male':
				file = halflingMale;
				break;
			case 'halfling-female':
				file = halflingFemale;
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
						<option value='human'> Human </option>
						<option value='elve'> Elve </option>
						<option value='halfling'> Halfling </option>
						<option value='gnome'> Gnome </option>
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
