import React, { useEffect, useState } from "react";
import './ConfigForm.css';
import parts from '../parts.json';
const ConfigForm = () => {




    const [compatibilityParameters, setCompatibilityParameters] = useState({
        socket: "", // CPU socket type (e.g., LGA 1700, AM5)
        chipset: "", // Motherboard chipset (e.g., B650, Z790)
        tdp: "", // Thermal Design Power (W)
        integratedGraphicsSupport: "", // Whether CPU has integrated graphics (true/false)
        motherboardFormFactor: "", // Motherboard size (ATX, Micro-ATX, Mini-ITX)
        ramType: "", // RAM type (DDR4, DDR5)
        ramSlots: "", // Number of RAM slots available
        maxRamCapacity: "", // Maximum supported RAM (GB)
        storageInterfaces: "", // Supported storage (SATA, NVMe, PCIe Gen4)
        pciSlots: "", // Number and type of PCIe slots
        gpuLength: "", // Maximum supported GPU length (mm)
        psuWattage: "", // Recommended PSU wattage (W)
        psuConnector: "", // PSU connectors required (e.g., 8-pin, 6+2-pin)
        caseSize: "", // Compatible case sizes (Full Tower, Mid Tower, Mini Tower)
        coolingSupport: "", // Air and liquid cooling support (e.g., 120mm, 240mm radiator)
        fanHeaders: "", // Number of available fan headers
        usbPorts: "", // Number and type of USB ports
        displayOutputs: "", // GPU display outputs (HDMI, DP, DVI)
        expansionSlots: "", // Number of PCIe expansion slots
        powerConnectors: "", // Power connectors needed for GPU and motherboard
        clearanceForCooler: "", // Max CPU cooler height (mm)
    })

    const handleSelect = (event) => {
        const component = JSON.parse(event.target.value)
        setCompatibilityParameters((prevState) => ({
            ...prevState,
            ...Object.keys(component).reduce((acc, key) => { //Object.keys returns an arrays of keys and .reduce basically maps through it and acc is the value for a give key
                acc[key] = component[key] ?? '';
                return acc;
            }, {}),
        }));
        console.log(compatibilityParameters);   
           
    }

    return (
        <div className="config-form-wrapper">
            <h1>Configure your PC</h1>
            <table>
                    <th>Component</th>
                    <th>Product</th>
                <tbody>
                <tr>
                    <td>CPU</td>
                    <td>
                    <select onChange={handleSelect}>
                        <option value="" disabled selected hidden>+ Choose CPU</option>
                        {parts.cpus.map((cpu, key) => {
                            return <option onClick={() => handleSelect(cpu)} key={key} value={JSON.stringify(cpu)}>{cpu.name}</option>
                        })}
                    </select>
                    </td>
                </tr>
                
                <tr>
                    <td>Motherboard</td>
                    <td>
                    <select>
                        <option value="" disabled selected hidden>+ Choose Motherboard</option>
                        {parts.motherboards.map((motherboard, key) => {
                            return <option key={key} value={motherboard.name}>{motherboard.name}</option>
                        })}
                    </select>
                    </td>
                </tr>
                <tr>
                    <td>Cooler</td>
                    <td>
                    <select>
                        <option value="" disabled selected hidden>+ Choose CPU Cooler</option>
                        {parts.CPU_Coolers.map((CPU_Cooler, key) => {
                            return <option key={key} value={CPU_Cooler.name}>{CPU_Cooler.name}</option>
                        })}
                    </select>
                    </td>
                </tr>
                
                <tr>
                    <td>RAM</td>
                    <td>
                    <select>
                    <option value="" disabled selected hidden>+ Choose RAM</option>
                    {parts.RAM.map((RAM, key) => {
                            return <option key={key} value={RAM.name}>{RAM.name}</option>
                        })}
                    </select>
                    </td>
                </tr>
                <tr>
                    <td>Storage</td>
                    <td>
                    <select>
                    <option value="" disabled selected hidden>+ Choose Storage</option>
                    {parts.Storage.map((Storage, key) => {
                            return <option key={key} value={Storage.name}>{Storage.name}</option>
                        })}
                    </select>
                    </td>
                </tr>
                
                <tr>
                    <td>GPU</td>
                    <td>
                    <select>
                    <option value="" disabled selected hidden>+ Choose GPU</option>
                    {parts.gpus.map((gpu, key) => {
                            return <option key={key} value={gpu.name}>{gpu.name}</option>
                        })}
                    </select>
                    </td>
                </tr>
                <tr>
                    <td>Case</td>
                    <td>
                    <select>
                    <option value="" disabled selected hidden>+ Choose Case</option>
                    {parts.cases.map((cases, key) => {
                            return <option key={key} value={cases.name}>{cases.name}</option>
                        })}
                    </select>
                    </td>
                </tr>
                <tr>
                    <td>Power Supply</td>
                    <td>
                    <select>
                        <option value="" disabled selected hidden>+ Choose Power Supply</option>
                        {parts.psus.map((psu, key) => {
                            return <option key={key} value={psu.name}>{psu.name}</option>
                        })}
                    </select>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ConfigForm;