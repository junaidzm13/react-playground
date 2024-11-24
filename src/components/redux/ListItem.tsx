import DeleteIcon from '@mui/icons-material/Delete';
import EditOffIcon from '@mui/icons-material/EditOff';
import EditIcon from '@mui/icons-material/Edit';
import { Checkbox, IconButton, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { TodoListItem } from '../types/TodoListItem';
import { useAppDispatch } from './state/hooks';
import { deleteItem, editItem } from './state/slices/todoListSlice';

type Props = TodoListItem;

export const ListItem: React.FC<Props> = props => {
  const dispatch = useAppDispatch();

  const onEdit = useCallback(
    <Key extends keyof TodoListItem>(key: Key) =>
      (v: TodoListItem[Key]) => {
        dispatch(editItem({ ...props, [key]: v }));
      },
    [dispatch, props]
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0.25em' }}>
      <Checkbox
        checked={props.completed}
        onChange={() => onEdit('completed')(!props.completed)}
      />
      {!props.inEditState ? (
        <>
          <span>{props.description}</span>
          <IconButton onClick={() => onEdit('inEditState')(true)}>
            <EditIcon />
          </IconButton>
        </>
      ) : (
        <>
          <TextField
            value={props.description}
            onChange={e => onEdit('description')(e.target.value)}
          />
          <IconButton onClick={() => onEdit('inEditState')(false)}>
            <EditOffIcon />
          </IconButton>
        </>
      )}
      <IconButton onClick={() => dispatch(deleteItem(props.id))}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
