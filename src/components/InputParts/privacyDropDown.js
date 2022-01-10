import React,{useState} from 'react'
import '../index.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from 'react-redux';
import { handlePost_Security } from '../../store/savePostSlice';
import { useSelector } from 'react-redux';
import { loginStates } from '../../store/userSlice';


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


export default function Privacydropdown() {
	const dispatch = useDispatch();
	const [ drop, setDrop ] = useState('public');
	const Status = useSelector(loginStates);
	const updateDrop = (e) => {
		setDrop(e.target.value);
		dispatch(handlePost_Security({Post_Security: e.target.value}))
    };
    
    // const privacy = ['public', 'private'];
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
                <MenuItem value={'public'}>public</MenuItem>
                <MenuItem disabled={!Boolean(Status.login) || !Boolean(Status.alreadyLogin)} value={'private'}>private</MenuItem>
			</Select>
		</div>
	);
}
