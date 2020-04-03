import React, { useState } from "react";
import HideButton from "./HideButton";

const SearchForm = ({
    searchName, handleSearchNameChanged,
    handleSearchButtonClicked
}) => {
    const [hidden, setHidden] = useState(false);
    const display = hidden ? "none" : "block";

    return (
        <form
            onSubmit={(e) => { e.preventDefault(); }}
            className="border rounded p-2 mt-2"
            style={{ position: "relative" }}>
            <h4 className="text-center mb-0">Поиск по участнику</h4>
            <HideButton handleClick={setHidden} position="absolute" />
            <div style={{ display: display }} >
                <div className="form-row mt-2">
                    <div className="col">
                        <input
                            className="form-control"
                            type="text"
                            value={searchName}
                            placeholder="Участник"
                            onChange={handleSearchNameChanged} />
                    </div>
                    <div className="col-auto">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleSearchButtonClicked}>
                            Поиск
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SearchForm;