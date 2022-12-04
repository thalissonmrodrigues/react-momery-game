import { GridItemType } from '../../types/GridItemType';
import * as C from './styles';
import b7Svg from '../../svgs/b7.svg';
import { Items } from '../../data/Items';

type Props = {
    item: GridItemType;
    onClick: () => void;
}

export const GridItem = ({ item, onClick }: Props) => {
    return (
        <C.Container onClick={onClick} showBackground={item.permanentShown || item.shown}>
            {!item.permanentShown && !item.shown &&
                <C.Icon src={b7Svg} alt="card" opacity={.1} ></C.Icon>
            }

            {(item.permanentShown || item.shown) && item.item !== null &&
                <C.Icon src={Items[item.item].icon} alt="card" ></C.Icon>
            }
        </C.Container>
    )
}