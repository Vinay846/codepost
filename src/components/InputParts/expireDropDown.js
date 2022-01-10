import React,{useState} from 'react'
import '../index.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useDispatch } from 'react-redux';
import { handleExpiration } from '../../store/savePostSlice';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};


export default function Expiredropdown() {
	const dispatch = useDispatch();
    const [ drop, setDrop ] = useState('Never');
	const updateDrop = (e) => {
		setDrop(e.target.value);
		dispatch(handleExpiration({Expiration: e.target.value}))

	};
	
    // const expire = ['10 Min', '1 Hours', '1 Day', '1 Week', '1 Year'];
    // Complete this using array

	return (
		<div className="highLighter">
			<Select
				value={drop}
				displayEmpty
				onChange={updateDrop}
				fullWidth
				MenuProps={{ ...MenuProps, autoFocus: true }}
			>
                <MenuItem value={'Never'}>Never</MenuItem>
                <MenuItem value={'B'}>Burn after read</MenuItem>
                <MenuItem value={'10Min'}>10 Min</MenuItem>
                <MenuItem value={'1Hours'}>1 Hours</MenuItem>
                <MenuItem value={'1Day'}>1 Day</MenuItem>
                <MenuItem value={'1Week'}>1 Week</MenuItem>
                <MenuItem value={'1Year'}>1 Year</MenuItem>
			</Select>
		</div>
	);
}
