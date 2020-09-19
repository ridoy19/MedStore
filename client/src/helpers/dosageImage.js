import React from 'react';
import Image from '../components/Image';

const dosagesVariation = [
    "Tablet",
    "Capsule",
    "Syringe",
    "Powder",
    "Syrup",
    "Drops",
    "Lotion",
    "Ointment",
    "Saline",
    "Suspension",
    "Injection",
    "Gel",
    "Mouthwash",
    "Suppository",
    "Nebuliser", 
    "Liquid", 
    "Cream", 
    "Spray", 
    "IM Injection",
    "Bolus", 
    "IV Infusion",
    "Inhalation", 
    "Aerosol"
];

export const dosageImage = (dosageType) => {
    if (dosageType.toLowerCase() === 'capsule')
        return <Image 
                    className="mx-auto d-block pt-2" 
                    src="https://medex.com.bd/img/dosage-forms/capsule.png" 
                    alt="capsule" 
                    style={{width: 60}}></Image> 
    if (dosageType.toLowerCase() === 'syrup')
        return <Image 
                    className="mx-auto d-block pt-2" 
                    src="https://medex.com.bd/img/dosage-forms/syrup-2.png" 
                    alt="syrup" 
                    style={{width: 60}}></Image> 
    if (dosageType.toLowerCase() === 'injection' || dosageType.toLowerCase() === 'syringe')
        return <Image 
                    className="mx-auto d-block pt-2" 
                    src="https://medex.com.bd/img/dosage-forms/injection.png" 
                    alt="injection" 
                    style={{width: 60}}></Image> 
    if (dosageType.toLowerCase() === 'tablet')
        return <Image 
                    className="mx-auto d-block pt-2" 
                    src="https://medex.com.bd/img/dosage-forms/tablet.png" 
                    alt="tablet" 
                    style={{width: 60}}></Image> 
    if (dosageType.toLowerCase() === 'suppository')
        return <Image 
                    className="mx-auto d-block pt-2" 
                    src="https://medex.com.bd/img/dosage-forms/suppository.png" 
                    alt="suppository" 
                    style={{width: 60}}></Image>                 
    if (dosageType.toLowerCase() === 'ointment')
        return <Image 
                    className="mx-auto d-block pt-2" 
                    src="https://medex.com.bd/img/dosage-forms/ointment.png" 
                    alt="ointment" 
                    style={{width: 60}}></Image>
    if (dosageType.toLowerCase() === 'im injection')
        return <Image 
                    className="mx-auto d-block pt-2" 
                    src="https://medex.com.bd/img/dosage-forms/im-injection.png"
                    alt="im injection" 
                    style={{width: 60}}></Image> 
    if (dosageType.toLowerCase() === 'iv injection')
        return <Image 
                className="mx-auto d-block pt-2" 
                src="https://medex.com.bd/img/dosage-forms/injection.png"
                alt="iv injection" 
                style={{width: 60}}></Image>  
    if (dosageType.toLowerCase() === 'eye drops')
        return <Image 
                    className="mx-auto d-block pt-2" 
                    src="https://medex.com.bd/img/dosage-forms/eye-drop-3.png" 
                    alt="eye-drop" 
                    style={{width: 60}}></Image>
    if (dosageType.toLowerCase() === 'paediatric drops')
        return <Image 
                        className="mx-auto d-block pt-2" 
                        src="https://medex.com.bd/img/dosage-forms/drop.png" 
                        alt="paediatric drops" 
                        style={{width: 60}}></Image>
    if (dosageType.toLowerCase() === 'iv infusion')
        return <Image 
                    className="mx-auto d-block pt-2" 
                    src="https://medex.com.bd/img/dosage-forms/iv-infusion.png" 
                    alt="iv infusion" 
                    style={{width: 60}}></Image>
    if (dosageType.toLowerCase() === 'eye ointment')
        return <Image 
                    className="mx-auto d-block pt-2" 
                    src="https://medex.com.bd/img/dosage-forms/eye-ointment-2.png"
                    alt="eye ointment" 
                    style={{width: 60}}></Image>
    if (dosageType.toLowerCase() === 'sachet')
                    return <Image 
                                className="mx-auto d-block pt-2" 
                                src="https://medex.com.bd/img/dosage-forms/sachet.png"
                                alt="sachet" 
                                style={{width: 60}}></Image>
    if (dosageType.toLowerCase() === 'cream')
        return <Image 
                    className="mx-auto d-block pt-2" 
                    src="https://medex.com.bd/img/dosage-forms/cream.png"
                    alt="cream" 
                    style={{width: 60}}></Image>
    if (dosageType.toLowerCase() === 'nasal spray')
        return <Image 
                    className="mx-auto d-block pt-2" 
                    src="https://medex.com.bd/img/dosage-forms/nasal-spray.png"
                    alt="nasal spray" 
                    style={{width: 60}}></Image>
    if (dosageType.toLowerCase() === 'nebuliser')
        return <Image 
                    className="mx-auto d-block pt-2" 
                    src="https://medex.com.bd/img/dosage-forms/nebuliser-solution.png"
                    alt="nebuliser" 
                    style={{width: 60}}></Image>
    if (dosageType.toLowerCase() === 'inhalation capsule')
        return <Image 
                className="mx-auto d-block pt-2" 
                src="https://medex.com.bd/img/dosage-forms/inhalation_capsule.png"
                alt="inhalation capsule" 
                style={{width: 60}}></Image>
    if (dosageType.toLowerCase() === 'aerosol inhalation')
        return <Image 
                className="mx-auto d-block pt-2" 
                src="https://medex.com.bd/img/dosage-forms/dry-powder-inhalation.png"
                alt="aerosol inhalation" 
                style={{width: 60}}></Image>                              
    else 
        return  <Image 
                    className="mx-auto d-block pt-2" 
                    src="med.png" 
                    alt="capsule" 
                    style={{width: 60}}></Image>
       
}