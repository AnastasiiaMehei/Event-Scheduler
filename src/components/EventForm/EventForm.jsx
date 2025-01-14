import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../redux/events/slice';
import { v4 as uuidv4 } from 'uuid';

const categories = ['Meeting', 'Birthday', 'Anniversary', 'Conference'];

export default  function EventForm () {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEvent({ id: uuidv4(), date, time, category, description }));
    setDate('');
    setTime('');
    setCategory(categories[0]);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your input fields here */}
    </form>
  );
};

