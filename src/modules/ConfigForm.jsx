import React, { useEffect, useState } from "react";
import './ConfigForm.css';
import parts from '../parts.json';
const ConfigForm = () => {




    const [compatibilityParameters, setCompatibilityParameters] = useState({
        socket: "", // CPU socket type (e.g., LGA 1700, AM5)
        chipset: "", // Motherboard chipset (e.g., B650, Z790)
      //  tdp: "", // Thermal Design Power (W)
       // integratedGraphicsSupport: "", // Whether CPU has integrated graphics (true/false)
        motherboardFormFactor: "", // Motherboard size (ATX, Micro-ATX, Mini-ITX)
      //  ramType: "", // RAM type (DDR4, DDR5)
      //  ramSlots: "", // Number of RAM slots available
      //  maxRamCapacity: "", // Maximum supported RAM (GB)
      //  storageInterfaces: "", // Supported storage (SATA, NVMe, PCIe Gen4)
       // pciSlots: "", // Number and type of PCIe slots
      //  gpuLength: "", // Maximum supported GPU length (mm)
       // psuWattage: "", // Recommended PSU wattage (W)
      //  psuConnector: "", // PSU connectors required (e.g., 8-pin, 6+2-pin)
       // caseSize: "", // Compatible case sizes (Full Tower, Mid Tower, Mini Tower)
       // coolingSupport: "", // Air and liquid cooling support (e.g., 120mm, 240mm radiator)
       // fanHeaders: "", // Number of available fan headers
       // usbPorts: "", // Number and type of USB ports
       // displayOutputs: "", // GPU display outputs (HDMI, DP, DVI)
        //expansionSlots: "", // Number of PCIe expansion slots
       // powerConnectors: "", // Power connectors needed for GPU and motherboard
       // clearanceForCooler: "", // Max CPU cooler height (mm)
    })

    const [updateComponentsTrigger, setUpdateComponentsTrigger] = useState(false)


    const handleSelect = (event) => {
        const selectedComponent = JSON.parse(event.target.value)
        Object.keys(selectedComponent).forEach((key) => {
            if (compatibilityParameters[key] || compatibilityParameters[key] === ''){
                setCompatibilityParameters((prevState) => ({
                    ...prevState,
                    [key]: selectedComponent[key]
                }))
            }
        })
        console.log(compatibilityParameters);
        setUpdateComponentsTrigger(!updateComponentsTrigger)
        
    }
    const [filteredParts, setFilteredParts] = useState(parts)
    const componentNames = ['CPU', 'Motherboard', 'CPU Cooler', 'RAM', 'Storage', 'GPU', 'Case', 'Power Supply']

    const updateComponents = () => {
        componentNames.forEach((component) => {
            parts[component].forEach((part) => {
                const hasParameters = Object.keys(part).forEach((parameter) => {
                    if(part[parameter] === compatibilityParameters[parameter] || compatibilityParameters[parameter] === '' || compatibilityParameters[parameter] === undefined){     //looks if a particular part from the list has a parameter that is included in the compatible parameters
                        //console.log('Parameter is included', part[parameter]);    //if true, the part should be included in the filtered parts
                    }else{
                        console.log('Parameter is not included', part[parameter], 'the compatible paramter', compatibilityParameters[parameter]);
                        
                    }
                    return null;
                }, false)
            })
        })
    }
    const updateComponentsTwo = () => {
        componentNames.forEach((componetCategory) => {
            parts[componetCategory].forEach((part) => {
                Object.keys(part).forEach((partProperty) => {

                    const partValue = part[partProperty]
                    const compatibilityValue = compatibilityParameters[partProperty]

                    if(compatibilityValue === partValue || !compatibilityValue || compatibilityValue === ''){
                        //the part needs to go in the update parts list + need to add all the parameters to the compatibility state
                    }else{
                        console.log(partValue, ' | ', compatibilityValue);
                    }
                    
                })
            })
        })
    }
    // when submitted -> take the selected part -> put its parameters in the compatibilityParameters state -> 
    // take the parts and acess individual category -> access individual part -> compare its parameters with the compatibilityParameters state
    // if the parameter matches, keep it

    useEffect(() => {
        updateComponentsTwo();
        console.log(compatibilityParameters);
        console.log('function ran');
        
        
    }, [updateComponentsTrigger])
    return (
        <div className="config-form-wrapper">
            <h1>Configure your PC</h1>
            <table>
                
                <tbody>
                    <tr>
                        <th>Component</th>
                        <th>Product</th>
                    </tr>
                    {componentNames.map((component, key) => {
                        return (
                            <tr key={key}>
                                <td>{component}</td>
                                <td>
                                <select onChange={handleSelect}>
                                <option value="" disabled selected hidden>+ Choose {component}</option>
                                {parts[component]?.map((part, key) => {
                                    return <option onClick={() => handleSelect(part)} key={key} value={JSON.stringify(part)}>{part.name}</option>
                                })}
                                </select>
                                </td>
                             </tr>
                        )
                    })}
                
                </tbody>
            </table>
        </div>
    )
}

export default ConfigForm;