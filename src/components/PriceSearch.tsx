import React from 'react';

interface PriceSearchProps {
    onHandleSearchKeyword: any
}

const PriceSearch: React.FC<PriceSearchProps> = ({ onHandleSearchKeyword }) => {

    const handleSearchKeyword = (e: React.FocusEvent<HTMLInputElement>) => {
        onHandleSearchKeyword(e.target.value);
    }

    return (
        <>
            <div className="bg-white flex flex-col mt-[2%] mr-[20%] mb-[2%] ml-[2%]">

                {/*SearchInputWrapper*/}
                <div className="flex flex-row min-h-[3vh]">


                    {/*SearchInputContainer*/}
                    <div
                        className="flex flex-row justify-items-center items-center w-9/10  border-b-[0.5px] border-black-600 pb-1">
                        {/*SearchInput*/}
                        <div className="w-9/10 pt-1 pb-1 pl-2">

                            <input onChange={handleSearchKeyword} type="text" name="name"
                                   className="w-[27rem] mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                   placeholder="coin"/>
                        </div>

                        {/*SearchButton*/}
                        <div className="flex flex-row justify-items-center items-center w-1/10 ml-3">

                            <span
                                className="input-group-text flex items-center px-1 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded"
                                id="basic-addon2">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search"
                                     className="w-4" role="img" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 512">
                                    <path fill="currentColor"
                                          d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                </svg>
                            </span>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )


};

export default PriceSearch;