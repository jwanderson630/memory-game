import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Card extends Component {
	render() {
		const { matched, flipped, color, symbol, id, clicked } = this.props;
		let cardClass = ["card"];
		if (flipped || matched) {
			cardClass.push("card--flipped");
		}
		return (
			<div className={cardClass.join(" ")} onClick={() => clicked(id)}>
				<div className="card__front">
					<div className="card__icon card__icon--front">
						<FontAwesomeIcon className="card__svg" icon="question" />
					</div>
				</div>
				<div className="card__back">
					<div
						className="card__icon"
						style={{
							backgroundColor:
								"rgba(" +
								color.red +
								"," +
								color.green +
								"," +
								color.blue +
								", 1.0)"
						}}
					>
						<FontAwesomeIcon className="card__svg" icon={symbol} />
					</div>
				</div>
			</div>
		);
	}
}

export default Card;
