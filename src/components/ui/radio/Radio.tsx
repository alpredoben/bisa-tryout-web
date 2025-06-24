interface RadioProps {
  name: string; // Radio group name
  value: string; // Value of the radio button
  checked?: boolean | false; // Whether the radio button is checked
  label: string; // Optional label for the radio button
}

const Radio : React.FC<RadioProps> = ({
	name,
	value,
	checked,
  	label,
}) => {
	return (
		<>
			<input 
				type="radio"
				name={name}
				value={value}
				checked={checked}
				className="w-6 h-6 border-gray-400 focus:ring-0 ring-0 dark:focus:bg-brand-700 dark:bg-gray-700 dark:border-gray-600"
			/>
			<label htmlFor={name} className="block ms-2 text-gray-900 dark:text-gray-300">
				{label}
			</label>
		</>
	) 
}

export default Radio