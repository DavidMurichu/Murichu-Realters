import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import "./style.css";
import { FetchData } from "../../appService/Delay";
import LocationCarousel from "./animation";
import { useLoading } from "../../appService/Loading";

const processPropertyData = (data) => {
    const cityData = {};
    data.forEach(property => {
        const city = property.property_city;
        if (!cityData[city]) {
            cityData[city] = {
                propertyCount: 0,
                firstImage: property.property_images[0],
                propertyTypes: {}
            };
        }
        cityData[city].propertyCount += 1;
        cityData[city].propertyTypes[property.property_type] = (cityData[city].propertyTypes[property.property_type] || 0) + 1;
    });
    return cityData;
};

const Location = () => {
    const [location, setLocation] = useState([]);
    const [data, setData] = useState([]);
    const {showLoading, hideLoading}=useLoading();
    

    const fetch = async () => {
        try {
            await FetchData('get-properties', setData, showLoading, hideLoading);
        } catch (error) {
            console.error("Error fetching data:", error);
            hideLoading()
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const cityData = processPropertyData(data);

            const locationData = Object.keys(cityData).map(city => ({
                name: city,
                cover: cityData[city].firstImage,
                propertyCount: cityData[city].propertyCount,
                propertyTypes: cityData[city].propertyTypes
            }));

            setLocation(locationData);
        }
    }, [data]);

  

    return (
            location.length!==0 &&(
                <section className='location background '>
                <div className='container'>
                    <Heading 
                        title='Explore By Location' 
                        subtitle='Discover the best properties in your desired area. Browse through different neighborhoods and find the perfect home for you.' 
                       
                    />
                    <LocationCarousel items={location} />
                  
                </div>
            </section>
            )
        
       
    );
};

export default Location;
