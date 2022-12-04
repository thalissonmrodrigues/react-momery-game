import * as C from './App.styles';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import logoImg from './assets/devmemory_logo.png';
import restartIcon from './svgs/restart.svg';
import { useEffect, useState } from 'react';
import { Items } from './data/Items';
import { GridItemType } from './types/GridItemType';
import { GridItem } from './components/GridItem';
import { FormatTime } from './helpers/FormatTime';

const App = () => {
	const [playing, setPlaying] = useState<boolean>(false);
	const [time, setTime] = useState<number>(0);
	const [moveCount, setMoveCount] = useState<number>(0);
	const [showCount, setShowCount] = useState<number>(0);
	const [gridItems, setGridItems] = useState<GridItemType[]>([]);

	useEffect(() => restartButton, []);
	
	// Start Time
	useEffect(() => {
		const timer = setInterval(() => {
			if (playing) {
				setTime(time + 1);
			}
		}, 1000);
		return () => clearInterval(timer);
	}, [playing, time]);

	// Check cards
	useEffect(() => {
		if(showCount === 2) {
			let opened = gridItems.filter(item => item.shown === true);
			if (opened.length === 2) {
				let gridTemp = [...gridItems];
				if (opened[0].item === opened[1].item) {
					for (let i in gridTemp) {
						if (gridTemp[i].shown) {
							gridTemp[i].permanentShown = true;
							gridTemp[i].shown = false;
						}
					}
				}
				else {
					setTimeout(() => {
						for (let i in gridTemp) {
							if (gridTemp[i].shown) {
								gridTemp[i].permanentShown = false;
								gridTemp[i].shown = false;	
							}
						}
					}, 300)
				}
				setGridItems(gridTemp);
				setShowCount(0);
				setMoveCount(moveCount + 1);
			}
		}
	}, [showCount, gridItems]);

	// Finish game.
	useEffect(() => {
		if (moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
			setPlaying(false);
		}
	}, [moveCount, gridItems]);

	const restartButton = () => {
		// Reset game.
		setTime(0);
		setMoveCount(0);
		setShowCount(0);

		// Create grid.
		let gridTemp: GridItemType[] = [];
		for (let i = 0; i < (Items.length * 2); i++) {
			gridTemp.push({
				item: null,
				shown: false,
				permanentShown: false
			})
		}

		for (let w = 0; w < 2 ; w++) {
			for (let y = 0; y < Items.length; y++) {
				let pos = -1;
				while(pos < 0 || gridTemp[pos].item !== null) {
					pos = Math.floor(Math.random() * (Items.length * 2));
				}
				gridTemp[pos].item = y;
			}
		}

		setGridItems(gridTemp);
		
		// Start game.
		setPlaying(true);
	}

	const handleItemClick = (index: number) => {
		if(playing && index !== null && showCount < 2) {
			let gridTemp = [...gridItems];
			if (!gridTemp[index].permanentShown && !gridTemp[index].shown) {
				gridTemp[index].shown = true;
				setShowCount(showCount + 1);
			}

			setGridItems(gridTemp)
		}
	}

	return (
		<div>
			<C.Container>
				<C.InfoArea>
					<C.Logo>
						<img src={logoImg} alt="logo" width="200" />
					</C.Logo>

					<C.Info>
						<InfoItem label="Tempo" value={FormatTime(time)}/>
						<InfoItem label="Movimentos" value={moveCount.toString()}/>
					</C.Info>

					<Button label="Reiniciar" icon={restartIcon} onClick={restartButton}/>
				</C.InfoArea>

				<C.GridArea>
					<C.Grid>
						{gridItems.map((item, key) => (
							<GridItem
								key={key}
								item={item}
								onClick={() => handleItemClick(key)}
							/>
						))}
					</C.Grid>
				</C.GridArea>
			</C.Container>
		</div>
	)
}

export default App;