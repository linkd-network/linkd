import React from "react";

interface ModalProps {
    showModal: boolean;
    title: string;
    closeCallBack: () => void
}
const SubscribeModal: React.FC<ModalProps> = ({ showModal, title, closeCallBack }) => {
    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-white ">
                                        Subscribe To {title}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => console.log}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto text-white">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        Copy and paste this code as the first item into the head of every webpage you want to measure
                                    </p>
                                    <pre className="chroma language-html">
                                        <code className=" language-html">
                                            <span className="token tag">
                                                <span className="token tag">
                                                    <span className="token punctuation">
                                                        &lt;</span>script</span>
                                                <span className="token attr-name"> src</span>
                                                <span className="token attr-value">
                                                    <span className="token punctuation attr-equals">=</span>
                                                    <span className="token punctuation">"</span>
                                                    https://www.linkdSC.com/track/js?id=1051s3934x
                                                    <span className="token punctuation">"</span>
                                                </span>
                                                <span className="token punctuation">&gt;</span>
                                            </span>


                                            <span className="token tag">
                                                <span className="token tag">
                                                    <span className="token punctuation">
                                                        &lt;</span>/script</span>
                                                <span className="token punctuation">&gt;</span>
                                            </span>

                                            <br />

                                            <span className="token tag">
                                                <span className="token tag">
                                                    <span className="token punctuation">
                                                        &lt;</span>script</span>

                                                <span className="token punctuation">&gt;</span>
                                            </span>
                                            <br />
                                            {
                                            `    window.LLayer = window.LLayer || []; \n    function linkdTag(){LLayer.push(args);} \n    linkdTag('js', new Date()); \n    linkdTag('conf', '1051s3934x');`
                                            }
                                            <br />

                                            <span className="token tag">
                                                <span className="token tag">
                                                    <span className="token punctuation">
                                                        &lt;</span>/script</span>
                                                <span className="token punctuation">&gt;</span>
                                            </span>

                                        </code>
                                    </pre>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="bg-blue-500  hover:bg-blue-700 text-white leading-tight text-sm py-2 px-6 rounded"
                                        type="button"
                                        onClick={() => closeCallBack()}
                                    >
                                        Done
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );

}


export default SubscribeModal;
