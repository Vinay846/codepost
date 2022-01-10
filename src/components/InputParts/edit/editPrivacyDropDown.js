import React,{useState, useEffect} from 'react'
import '../index.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { edithandlePost_Security } from '../../../store/savePostSlice';
import { useSelector, useDispatch } from 'react-redux';
import {editData} from '../../../store/savePostSlice';


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


export default function EditPrivacydropdown() {
	const dispatch = useDispatch();
	const [ drop, setDrop ] = useState('public');
	const prevData = useSelector(editData);
	

	const updateDrop = (e) => {
		setDrop(e.target.value);
		dispatch(edithandlePost_Security({Post_Security: e.target.value}))
    };
    
    // const privacy = ['public', 'private'];
	// Complete this using array
	
	useEffect(() => {
		setDrop(prevData.Post_Security);
	}, [prevData.Post_Security])

	return (
		<div className="highLighter">
			<Select
				value={drop}
				displayEmpty
				onChange={updateDrop}
				fullWidth
				MenuProps={{ ...MenuProps, autoFocus: true }}
			>
                <MenuItem value={'public'}>public</MenuItem>
                <MenuItem value={'private'}>private</MenuItem>
			</Select>
		</div>
	);
}
