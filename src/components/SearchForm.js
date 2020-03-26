import React from "react";

const SearchForm = ({
    searchName, handleSearchNameChanged,
    handleSearchButtonClicked
}) => (
        <React.Fragment>
        <form className="border rounded p-2 mt-2">
            <h4 className="text-center">Поиск по участнику</h4>
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
            {/* <div className="form-row mt-2">
                <p></p>
            </div> */}
        </form>
        </React.Fragment>

    );

export default SearchForm;