import React,{useState} from 'react'
import '../index.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useDispatch } from 'react-redux';
import { handleSyntax_Highlighting } from '../../store/savePostSlice';

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


export default function LanguageDropdown() {
	const [ drop, setDrop ] = useState('None');
	const dispatch = useDispatch();
	const updateDrop = (e) => {
		setDrop(e.target.value);
		dispatch(handleSyntax_Highlighting({Syntax_Highlighting: e.target.value}))

    };
    
    // const language = ['Java', 'html', 'Python', 'Go', 'Php', 'Css'];
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
				<MenuItem value={'None'}>None</MenuItem>
				<MenuItem value={'Java'}>Java</MenuItem>
				<MenuItem value={'html'}>html</MenuItem>
				<MenuItem value={'Python'}>Python</MenuItem>
				<MenuItem value={'JavaScript'}>JavaScript</MenuItem>
				<MenuItem value={'Go'}>Go</MenuItem>
				<MenuItem value={'Php'}>Php</MenuItem>
			</Select>
		</div>
	);
}
