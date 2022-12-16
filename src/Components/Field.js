import './fiels.css'

export default function Field(props){
    return(
    <div className="group">
        <input type='number' min = '0' value={props.inputValue} onChange={props.changeValue}/>
        <select value={props.selected} onChange={props.changeSelected}>
          {props.allCurrencies.map((el)=>{
            return <option key={el.r030}>{el.txt}</option>
          })}
        </select>
      </div>
    )
}