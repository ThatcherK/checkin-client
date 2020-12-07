import React, { useState, createContext } from 'react';

export const dataContext = createContext();
const Data = (props) => {
	const [ data, setData ] = useState([]);
    const [registerData, setRegisterData] = useState([])
	return (
		<dataContext.Provider
			value={{
                data, 
                setData,
                registerData,
                setRegisterData
			}}
		>
			{props.children}
		</dataContext.Provider>
	);
};
export default Data;
