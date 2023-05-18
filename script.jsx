# drag-and-drop-script
import { useDrag } from 'react-dnd';

type BottleDragProps = {
	bottle: BottleType;
	position: PositionType;
};

const BOTTLE_DND_TYPE = 'BOTTLE_DND_TYPE';

const BottleDrag: React.FC<BottleDragProps> = ({
	bottle,
	position,
}: BottleDragProps) => {

	const store = useStore(BottlesGameContext);

	const [
		{ isDragging },
		drag // ref drag-элемента
	] = useDrag({
		item: {
			type: BOTTLE_DND_TYPE, // с помощью типа можно использовать несколько совместимых drag и drop элементов в одном контексте
			bottle // передаем конфиг текущей бутылки в контекст
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(), // фиксируем события в момент рендера
		}),
		begin: () => store.onDrag(position),
	});

	return (
		<BottleDragWrapper
			ref={drag}
			position={position}
			isDragging={isDragging}
			style={{
				backgroundImage: `url(${bottle.image})`,
			}}
		/>
	);
