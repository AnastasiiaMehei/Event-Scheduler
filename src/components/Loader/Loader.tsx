import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader: React.FC = () => {
    return (
        <div className={css.div}>
            <ThreeDots 
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}

export default Loader;
