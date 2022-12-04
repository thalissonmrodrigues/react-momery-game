import * as C from './App.styles';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import logoImg from './assets/devmemory_logo.png';
import restartIcon from './svgs/restart.svg';
import { useEffect, useState } from 'react';
import { Items } from './data/Items';
import { GridItemType } from './types/GridItemType';
import { GridItem } from './components/GridItem';

const App = () => {
	const [playing, setPlaying] = useState<boolean>(false);
	const [time, setTime] = useState<number>(0);
	const [moveCount, setMoveCount] = useState<number>(0);
	const [showCount, setShowCount] = useState<number>(0);
	const [gridItems, setGridItems] = useState<GridItemType[]>([]);

	useEffect(() => restartButton, []);

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

	}

	return (
		<div>
			<C.Container>
				<C.InfoArea>
					<C.Logo>
						<img src={logoImg} alt="logo" width="200" />
					</C.Logo>

					<C.Info>
						<InfoItem label="Tempo" value="00:00"/>
						<InfoItem label="Movimentos" value="0"/>
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