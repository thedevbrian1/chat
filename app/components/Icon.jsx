export function BallTriangle() {
    return (
        <svg viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
            <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                    <circle cx="5" cy="50" r="5">
                        <animate attributeName="cy"
                            begin="0s" dur="2.2s"
                            values="50;5;50;50"
                            calcMode="linear"
                            repeatCount="indefinite" />
                        <animate attributeName="cx"
                            begin="0s" dur="2.2s"
                            values="5;27;49;5"
                            calcMode="linear"
                            repeatCount="indefinite" />
                    </circle>
                    <circle cx="27" cy="5" r="5">
                        <animate attributeName="cy"
                            begin="0s" dur="2.2s"
                            from="5" to="5"
                            values="5;50;50;5"
                            calcMode="linear"
                            repeatCount="indefinite" />
                        <animate attributeName="cx"
                            begin="0s" dur="2.2s"
                            from="27" to="27"
                            values="27;49;5;27"
                            calcMode="linear"
                            repeatCount="indefinite" />
                    </circle>
                    <circle cx="49" cy="50" r="5">
                        <animate attributeName="cy"
                            begin="0s" dur="2.2s"
                            values="50;50;5;50"
                            calcMode="linear"
                            repeatCount="indefinite" />
                        <animate attributeName="cx"
                            from="49" to="49"
                            begin="0s" dur="2.2s"
                            values="49;5;27;49"
                            calcMode="linear"
                            repeatCount="indefinite" />
                    </circle>
                </g>
            </g>
        </svg>
    );
}

export function ThreeDots() {
    return (
        <svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <circle cx="15" cy="15" r="15">
                <animate attributeName="r" from="15" to="15"
                    begin="0s" dur="0.8s"
                    values="15;9;15" calcMode="linear"
                    repeatCount="indefinite" />
                <animate attributeName="fill-opacity" from="1" to="1"
                    begin="0s" dur="0.8s"
                    values="1;.5;1" calcMode="linear"
                    repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="15" r="9" fillOpacity="0.3">
                <animate attributeName="r" from="9" to="9"
                    begin="0s" dur="0.8s"
                    values="9;15;9" calcMode="linear"
                    repeatCount="indefinite" />
                <animate attributeName="fill-opacity" from="0.5" to="0.5"
                    begin="0s" dur="0.8s"
                    values=".5;1;.5" calcMode="linear"
                    repeatCount="indefinite" />
            </circle>
            <circle cx="105" cy="15" r="15">
                <animate attributeName="r" from="15" to="15"
                    begin="0s" dur="0.8s"
                    values="15;9;15" calcMode="linear"
                    repeatCount="indefinite" />
                <animate attributeName="fill-opacity" from="1" to="1"
                    begin="0s" dur="0.8s"
                    values="1;.5;1" calcMode="linear"
                    repeatCount="indefinite" />
            </circle>
        </svg>
    );
}

export function StarsIllustration() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" dataname="Layer 1" viewBox="0 0 855.93958 630.06608" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M935.43234,472.55767c-3.73,43.08-22.51,84.71-49.3,119.14q-1.68,2.16-3.4,4.28-3.87,4.77-7.94,9.36-4.98,5.655-10.25,11.05005-4.29,4.43994-8.78,8.68994-3.465,3.315-7.01,6.5c-28.43,25.69-61.09,46.89-94.74,65.43005-65.67,36.17-137.65,63.56995-212.52,67.56-74.86,3.98-153.01-17.46-207.91-68.52-73.99-68.81-94.63995-183.58-64.6-280.05,19.98-64.18,60.76-122.24,116.26-160.16,55.02-37.59,124.43-54.51,190.12-43.44995,52.44-31.87006,121.09-32.48,178.1-8.89,30.42,12.59,57.72,31.31,81.67,53.93a339.34337,339.34337,0,0,1,30.72,33.23q1.455,1.785,2.88,3.6,5.97,7.545,11.55,15.4,8.01,11.265,15.21,23.03c1.32,2.16,2.63,4.33,3.91,6.52.86,1.47,1.73,2.95,2.58,4.44a.29776.29776,0,0,1,.04.1c13.31,23.41,24.19,48.39,29.86005,74.5,1,4.62,1.84,9.26,2.49,13.94v.01q.855,5.955,1.29,11.97A176.97711,176.97711,0,0,1,935.43234,472.55767Z" transform="translate(-172.03021 -134.96696)" fill="#3f3d56" /><path d="M740.07386,537.68412,591.61233,414.00627,735.84027,542.638a3.44161,3.44161,0,1,0,4.23359-4.95386Z" transform="translate(-172.03021 -134.96696)" fill="#f0f0f0" opacity="0.3" /><circle cx="227.58212" cy="250.78071" r="89" fill="#f2f2f2" /><path d="M478.61233,379.74767a80.99369,80.99369,0,0,1-81,81,81.57161,81.57161,0,0,1-27.8-4.9,81.05489,81.05489,0,1,1,108.8-76.1Z" transform="translate(-172.03021 -134.96696)" fill="#fff" /><circle cx="211.58212" cy="217.78071" r="25" fill="#e4e4e4" /><path d="M475.45236,357.27764a25.00115,25.00115,0,0,1-27.6-41.08A81.05279,81.05279,0,0,1,475.45236,357.27764Z" transform="translate(-172.03021 -134.96696)" fill="#f2f2f2" /><circle cx="252.58212" cy="271.78071" r="9" fill="#e4e4e4" /><path d="M387.61233,457.74767a9.04581,9.04581,0,0,1-.31,2.34,79.52774,79.52774,0,0,1-17.49-4.24,9.00157,9.00157,0,0,1,17.8,1.9Z" transform="translate(-172.03021 -134.96696)" fill="#f2f2f2" /><path d="M334.61233,375.74767a18.002,18.002,0,0,1-16.8,17.96,81.54773,81.54773,0,0,1,1.76-35.71A18.00026,18.00026,0,0,1,334.61233,375.74767Z" transform="translate(-172.03021 -134.96696)" fill="#f2f2f2" /><circle cx="606.45653" cy="208.48305" r="3.70234" fill="#e49d23" /><circle cx="572.30231" cy="119.94851" r="2.16307" fill="#f0f0f0" /><circle cx="225.30231" cy="543.94851" r="2.16307" fill="#f0f0f0" /><circle cx="584.58144" cy="331.59402" r="2.16307" fill="#f0f0f0" /><circle cx="305.45653" cy="350.48305" r="3.70234" fill="#e49d23" /><circle cx="171.45653" cy="416.48305" r="17.48305" fill="#e49d23" /><circle cx="267.30231" cy="435.94851" r="2.16307" fill="#f0f0f0" /><circle cx="487.30231" cy="97.94851" r="2.16307" fill="#f0f0f0" /><circle cx="358.30231" cy="558.94851" r="2.16307" fill="#f0f0f0" /><circle cx="326.30231" cy="117.94851" r="2.16307" fill="#f0f0f0" /><circle cx="382.30231" cy="222.94851" r="2.16307" fill="#f0f0f0" /><circle cx="296.58144" cy="480.59402" r="2.16307" fill="#f0f0f0" /><circle cx="549.58144" cy="494.59402" r="2.16307" fill="#f0f0f0" /><circle cx="437.58144" cy="368.59402" r="2.16307" fill="#f0f0f0" /><circle cx="494.58144" cy="222.59402" r="2.16307" fill="#f0f0f0" /><circle cx="598.21204" cy="292.65473" r="4.28889" fill="#ff6584" /><circle cx="424.21204" cy="150.65473" r="4.28889" fill="#ff6584" /><circle cx="424.21204" cy="445.65473" r="4.28889" fill="#ff6584" /><path d="M863.45236,605.33764a7.694,7.694,0,0,0-7.39,5.58,7.3896,7.3896,0,0,0-.3,2.12v12.04q4.485-4.24494,8.78-8.68994,5.265-5.40006,10.25-11.05005Z" transform="translate(-172.03021 -134.96696)" fill="#e49d23" /><path d="M890.68118,667.89806q-19.36816,0-42.45654-1.46386c-79.61377-5.05567-182.7378-22.63282-290.376-49.49219-107.6377-26.85938-206.93018-59.79395-279.58545-92.73438-35.39258-16.04687-62.55615-31.23632-80.73535-45.14746-19.24707-14.72705-27.666-27.564-25.02393-38.15283,5.148-20.62891,50.731-25.14209,88.064-25.29541l.01269,3c-51.26806.21045-81.51367,8.38672-85.16552,23.022-4.65186,18.64014,33.28662,47.74073,104.08691,79.84131,72.49561,32.86817,171.60547,65.73926,279.07324,92.55664,107.46729,26.81641,210.40137,44.36328,289.83985,49.40821,77.57861,4.92773,124.74316-2.9375,129.39453-21.57813,3.86181-15.47656-21.59815-38.27539-71.68946-64.19824l1.37891-2.66406c36.397,18.83593,78.64551,45.85156,73.22168,67.58886-2.64258,10.58887-16.10547,17.96485-40.01514,21.92285C927.0762,666.7672,910.33548,667.89806,890.68118,667.89806Z" transform="translate(-172.03021 -134.96696)" fill="#e49d23" /><circle cx="714.58212" cy="208.78071" r="100.5" fill="#fff" /><path d="M886.61233,241.74767a102,102,0,1,0,102,102A101.635,101.635,0,0,0,886.61233,241.74767Zm0,201a99,99,0,1,1,99-99A98.61767,98.61767,0,0,1,886.61233,442.74767Z" transform="translate(-172.03021 -134.96696)" fill="#2f2e41" /><path d="M798.417,367.81847a2.00078,2.00078,0,0,1-1.957-1.59765,97.66924,97.66924,0,0,1,22.34082-83.13526,2,2,0,0,1,2.98633,2.66114A93.59682,93.59682,0,0,0,800.378,365.41515a2.00228,2.00228,0,0,1-1.96094,2.40332Z" transform="translate(-172.03021 -134.96696)" fill="#2f2e41" /><circle cx="714.51924" cy="238.27373" r="63.87702" fill="#e49d23" /><path d="M866.24805,397.35666c-4.14062-.115-9.29385-.25869-13.26384-3.15874a10.18618,10.18618,0,0,1-4.00806-7.60607,6.85213,6.85213,0,0,1,2.33007-5.62763c2.07352-1.75216,5.10139-2.16313,8.36441-1.2042l-3.38076-24.7061,2.48174-.34,3.97444,29.04518-2.07245-.951c-2.4027-1.10205-5.70088-1.66285-7.7504.06911a4.40263,4.40263,0,0,0-1.44375,3.62659,7.69887,7.69887,0,0,0,2.98246,5.67107c3.08949,2.25668,7.19708,2.54779,11.85585,2.678Z" transform="translate(-172.03021 -134.96696)" fill="#2f2e41" /><rect x="658.49493" y="222.21767" width="13.49133" height="2.50498" fill="#2f2e41" /><rect x="701.07961" y="222.21765" width="13.49133" height="2.50498" fill="#2f2e41" /><path d="M889.23233,452.90765h-57.9a8.14716,8.14716,0,0,0-8.13995,8.14v128.33a47.66955,47.66955,0,0,0,25.56,42.19995q3.555-3.18,7.01-6.5,4.485-4.24494,8.78-8.68994,5.265-5.40006,10.25-11.05005,4.08006-4.59,7.94-9.36,1.725-2.115,3.4-4.28c26.79-34.43,45.57-76.06,49.3-119.14A64.04854,64.04854,0,0,0,889.23233,452.90765Z" transform="translate(-172.03021 -134.96696)" fill="#2f2e41" /><path d="M891.34231,479.68767a14.61136,14.61136,0,0,0-10.43-4.17,14.465,14.465,0,0,0-9.16,3.36005,13.12263,13.12263,0,0,0-1.17,1.07l-47.38995,48.6-34.37,35.25a6.80061,6.80061,0,0,0-1.28,1.8,7.29573,7.29573,0,0,0-.77,3.32,7.16751,7.16751,0,0,0,2.18006,5.07l1.35,1.32,9.8,9.55.01-.01a7.29073,7.29073,0,0,0,4.66,1.63,7.167,7.167,0,0,0,5.07-2.18l1.59-1.62,11.38-11.67.38-.39,68.41-70.16a14.69128,14.69128,0,0,0-.26-20.77Z" transform="translate(-172.03021 -134.96696)" fill="#e49d23" /><path d="M890.86152,343.44c2.1124-4.46658-.05349-9.23761-3.76378-12.09072-4.67557-3.59539-10.7221-3.00085-16.04008-1.29905-5.82238,1.8632-11.51366,5.21608-17.80383,5.02337a11.13058,11.13058,0,0,1-10.24407-7.27764c-3.3687-8.639.43561-18.29488,6.29971-24.84681a34.26766,34.26766,0,0,1,26.544-11.586,34.64989,34.64989,0,0,1,28.068,16.9026,1.54079,1.54079,0,0,0,2.05229.53813,36.88225,36.88225,0,0,1,28.39377-.71432,36.28984,36.28984,0,0,1,22.58042,34.49188c-.05,1.93122,2.95005,1.9301,3,0a39.89155,39.89155,0,0,0-10.59928-27.81249,38.71871,38.71871,0,0,0-27.56681-12.16772,39.33641,39.33641,0,0,0-17.32226,3.61223l2.05229.53813a37.69886,37.69886,0,0,0-25.0988-17.728,36.48542,36.48542,0,0,0-29.42384,7.32772c-7.70165,6.02707-13.53849,15.38016-13.17519,25.41071.15721,4.34047,1.44713,8.796,4.4606,12.03051,3.85981,4.14287,9.62229,4.85944,14.94631,3.798,7.07554-1.41071,13.53533-6.06449,20.91133-5.92113a10.21164,10.21164,0,0,1,7.6417,3.4453c1.62455,1.83335,2.6042,4.47042,1.49716,6.81122-.82094,1.73585,1.76463,3.26026,2.59041,1.51416Z" transform="translate(-172.03021 -134.96696)" fill="#2f2e41" /><path d="M412.09426,704.32287c-35.59912.001-68.69433-1.22071-98.32226-3.68555-38.72656-3.22266-69.41455-8.40332-91.21045-15.39648-23.07666-7.40528-35.31934-16.667-36.38818-27.52832-2.083-21.15821,39.334-40.72461,74.44531-53.41309l1.01953,2.82227c-48.2168,17.42382-73.957,35.28613-72.47949,50.29785,1.88183,19.11914,47.39209,33.78125,124.86181,40.22754,79.3252,6.60058,183.71729,4.26172,293.94727-6.58985,110.23-10.84863,213.07568-28.90625,289.59131-50.8457,74.72607-21.42578,116.50488-44.67969,114.623-63.79883-1.5625-15.874-33.20264-28.793-89.0918-36.3789l.40332-2.97266c40.60986,5.51172,89.47949,16.76172,91.67383,39.05762,1.06933,10.86132-9.1333,22.332-30.32276,34.09375-20.01465,11.10937-49.10351,22.17285-86.45849,32.88281-76.68506,21.98828-179.71973,40.08105-290.12451,50.94824C539.00247,700.86,472.01663,704.32287,412.09426,704.32287Z" transform="translate(-172.03021 -134.96696)" fill="#e49d23" /><circle cx="838.45653" cy="434.48305" r="17.48305" fill="#e49d23" /><circle cx="331.45653" cy="17.48305" r="17.48305" fill="#e6e6e6" /><circle cx="19.45653" cy="433.48305" r="17.48305" fill="#e6e6e6" /><circle cx="127.45653" cy="108.48305" r="10.70234" fill="#ff6584" /><circle cx="77.45653" cy="514.48305" r="10.70234" fill="#ff6584" /><circle cx="807.45653" cy="339.48305" r="10.70234" fill="#ff6584" /><circle cx="645.45653" cy="598.48305" r="17.48305" fill="#e6e6e6" /></svg>
    );
} 