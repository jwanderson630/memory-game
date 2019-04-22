import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faAmbulance,
	faAnchor,
	faAward,
	faBalanceScale,
	faBed,
	faBeer,
	faBicycle,
	faBell,
	faArchive,
	faBirthdayCake,
	faBomb,
	faBook,
	faBriefcase,
	faBroadcastTower,
	faBug,
	faBuilding,
	faBullhorn,
	faBullseye,
	faCalculator,
	faCamera,
	faCameraRetro,
	faClipboard,
	faCog,
	faCompass,
	faCookie,
	faCookieBite,
	faCoffee,
	faEye,
	faFeather,
	faEyeDropper,
	faFighterJet,
	faFlagCheckered,
	faFutbol,
	faGamepad,
	faGlasses,
	faHeadphones,
	faHeart,
	faHelicopter,
	faMagic,
	faPaw,
	faPaperPlane,
	faRocket,
	faStar,
	faQuestion
} from "@fortawesome/free-solid-svg-icons";

import Card from "./Card";
import "./App.css";

const symbols = [
	"ambulance",
	"anchor",
	"award",
	"balance-scale",
	"bed",
	"beer",
	"bicycle",
	"bell",
	"archive",
	"bell",
	"birthday-cake",
	"bomb",
	"book",
	"briefcase",
	"broadcast-tower",
	"bug",
	"building",
	"bullhorn",
	"bullseye",
	"bullseye",
	"calculator",
	"camera",
	"camera-retro",
	"clipboard",
	"cog",
	"compass",
	"cookie",
	"cookie-bite",
	"coffee",
	"eye",
	"feather",
	"eye-dropper",
	"fighter-jet",
	"flag-checkered",
	"futbol",
	"gamepad",
	"glasses",
	"headphones",
	"heart",
	"helicopter",
	"magic",
	"paw",
	"paper-plane",
	"rocket"
];

class App extends Component {
	state = {
		cards: [],
		height: 4,
		width: 4,
		firstPickIndex: null,
		wait: false,
		guesses: 0,
		best: "##"
	};

	async componentDidMount() {
		const newCards = await this.getCards();
		this.setState({
			cards: newCards
		});
	}

	getRandomSymbol = usedSymbols => {
		return new Promise(resolve => {
			let randomIndex = Math.floor(Math.random() * symbols.length);
			let newSymbol = symbols[randomIndex];
			if (usedSymbols.indexOf(newSymbol) < 0) {
				resolve(newSymbol);
			} else {
				while (usedSymbols.indexOf(newSymbol) >= 0) {
					randomIndex = Math.floor(Math.random() * symbols.length);
					newSymbol = symbols[randomIndex];
					if (usedSymbols.indexOf(newSymbol) < 0) {
						resolve(newSymbol);
					}
				}
			}
		});
	};

	getRandomColor = () => {
		return new Promise(resolve => {
			const red = Math.floor(Math.random() * 255);
			const green = Math.floor(Math.random() * 255);
			const blue = Math.floor(Math.random() * 255);
			resolve({
				red: red,
				green: green,
				blue: blue
			});
		});
	};

	getCards = () => {
		return new Promise(async resolve => {
			let cards = [];
			let usedSymbols = [];
			const pairs = (this.state.height * this.state.width) / 2;
			for (let i = 1; i <= pairs; i++) {
				const symbol = await this.getRandomSymbol(usedSymbols);
				const color = await this.getRandomColor();
				cards.splice(Math.floor(Math.random() * cards.length), 0, {
					symbol: symbol,
					color: color,
					id: symbol + "1",
					matched: false,
					flipped: false
				});
				cards.splice(Math.floor(Math.random() * cards.length), 0, {
					symbol: symbol,
					color: color,
					id: symbol + "2",
					matched: false,
					flipped: false
				});
				usedSymbols.push(symbol);
				if (i === pairs) {
					resolve(cards);
				}
			}
		});
	};

	handleCardPick = cardId => {
		const { firstPickIndex, wait } = this.state;
		let newCards = [...this.state.cards];
		let newCardIndex = newCards.findIndex(c => {
			return c.id === cardId;
		});
		let newCard = { ...newCards[newCardIndex] };
		let newFirstPick = { ...newCards[firstPickIndex] };
		let newGuesses = this.state.guesses + 1;
		if (newCard.id === newFirstPick.id || newCard.matched || wait) return;
		if (!firstPickIndex && firstPickIndex !== 0) {
			newCard.flipped = true;
			newCards[newCardIndex] = newCard;
			this.setState({
				cards: newCards,
				firstPickIndex: newCardIndex
			});
		} else if (newCard.symbol === newFirstPick.symbol) {
			newFirstPick.matched = true;
			newCard.matched = true;
			newCards[newCardIndex] = newCard;
			newCards[firstPickIndex] = newFirstPick;
			setTimeout(this.checkWin, 500);
			this.setState({
				cards: newCards,
				firstPickIndex: null,
				guesses: newGuesses
			});
		} else {
			newCard.flipped = true;
			newCards[newCardIndex] = newCard;
			setTimeout(() => {
				newCard.flipped = false;
				newFirstPick.flipped = false;
				newCards[newCardIndex] = newCard;
				newCards[firstPickIndex] = newFirstPick;
				this.setState({
					cards: newCards,
					firstPickIndex: null,
					wait: false
				});
			}, 500);
			this.setState({
				cards: newCards,
				firstPickIndex: null,
				wait: true,
				guesses: newGuesses
			});
		}
	};

	render() {
		const cards = this.state.cards.map(card => (
			<Card
				symbol={card.symbol}
				flipped={card.flipped}
				matched={card.matched}
				clicked={this.handleCardPick}
				color={card.color}
				id={card.id}
				key={card.id}
			/>
		));
		return (
			<div className="App">
				<div className="board">{cards}</div>
				<div className="menu">
					<div className="menu__section menu__section--guesses">
						<h1>GUESSES</h1>
						<div className="menu__score">{this.state.guesses}</div>
					</div>
					<div className="menu__section menu__section--best">
						<h1>BEST</h1>
						<div className="menu__score">{this.state.best}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;

library.add(
	faAmbulance,
	faAnchor,
	faAward,
	faBalanceScale,
	faBed,
	faBeer,
	faBicycle,
	faBell,
	faArchive,
	faBell,
	faBirthdayCake,
	faBomb,
	faBook,
	faBriefcase,
	faBroadcastTower,
	faBug,
	faBuilding,
	faBullhorn,
	faBullseye,
	faCalculator,
	faCamera,
	faCameraRetro,
	faClipboard,
	faClipboard,
	faCog,
	faCompass,
	faCookie,
	faCookieBite,
	faCoffee,
	faEye,
	faFeather,
	faEyeDropper,
	faFighterJet,
	faFlagCheckered,
	faFutbol,
	faGamepad,
	faGlasses,
	faHeadphones,
	faHeart,
	faHelicopter,
	faMagic,
	faPaw,
	faPaperPlane,
	faRocket,
	faStar,
	faQuestion
);
