import React,{FormEventHandler} from 'react'


interface IInputProps{
    disabled:boolean,
    type:"select"|"text"|"number",
    data?:string[]|null,
    onChange?: (event:any) => void;
}

export default function CustomInput(props:IInputProps) {
  return (
    <div>
        {props.type=="text"||props.type=="number"?
        <input required disabled={props.disabled} type={props.type} onChange={props.onChange?props.onChange:()=>{}} name='search' style={{width:"200px"}} className='form-control'/>
        :
        <select required onChange={props.onChange?props.onChange:()=>{}} className='form-control form-select' name='search' >
            <option value="" selected disabled >Select One</option>
            {props.data?.map((val:string)=><option value={val} >{val}</option>)}
        </select>
    }
    </div>
  )
}
