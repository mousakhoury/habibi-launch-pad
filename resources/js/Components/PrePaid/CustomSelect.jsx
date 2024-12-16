import React, { useState, useRef, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

const CustomSelect = ({ options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const dropdownRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState(() => {
        // Assuming the 'country' query parameter is being used
        const urlParams = new URLSearchParams(window.location.search);
        const countryQueryParam = urlParams.get("country");
        if (
            countryQueryParam &&
            options.includes(decodeURIComponent(countryQueryParam))
        ) {
            return decodeURIComponent(countryQueryParam);
        }
        return placeholder;
    });

    useEffect(() => {}, [selectedOption]);

    // Define a "Select All" option
    const selectAllOption = "Select All";

    useEffect(() => {
        // Handle click outside to close the dropdown
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option === selectAllOption ? placeholder : option);
        setIsOpen(false);
        setSearchValue("");
        if (option) {
            if (option === "Select All") {
                // If "Select All" is selected, you might want to revert to a default view,
                // For example, fetch all cards without a country filter
                Inertia.get("/prepaid-cards", {}, { preserveState: false });
            } else {
                // If any other option is selected, proceed with the Inertia request with the selected country
                Inertia.get(
                    "/prepaid-cards",
                    { country: option },
                    { preserveState: false }
                );
            }
        }
    };

    const filteredOptions = [selectAllOption, ...options].filter((option) =>
        option.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="custom-select-container" ref={dropdownRef}>
            <div
                className={`custom-select-control ${isOpen ? "open" : ""}`}
                onClick={toggleDropdown}
            >
                {selectedOption ? selectedOption : placeholder}
            </div>
            {isOpen && (
                <>
                    <div className="custom-select-dropdown">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="custom-select-search"
                            placeholder="Search..."
                        />
                        <div className="dropdown-options">
                            {filteredOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className={`custom-select-option ${
                                        selectedOption === option
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CustomSelect;
