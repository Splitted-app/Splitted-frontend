import '../../css/InsightsPage/InsightsPage.css'

import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';
import Navbar from "../Common/Navbar"

import { BarChart,LineChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, LabelList } from 'recharts';

import { MenuIconVisibilityState } from '../../atoms/MenuIconVisibility';




function InsightsPage() {

    useEffect(()=>{
        setMenuIconVisibility(false);
    },[])
      
    const setMenuIconVisibility = useSetRecoilState(MenuIconVisibilityState);
    const data=[
        {
          expenses:50000,
          income:100000
        }
      ]

    return (
      <div className="insights-page">
        <Navbar></Navbar>
        <div className='insights-page-content'>
            <div className='header'>
                <div className='income-expenses-chart'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={500} height={300} data={data} layout="vertical" margin={{top: 20, right: 100,left: 0, bottom: 15}}  barGap={0}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" hide/>
                        <Bar dataKey="expenses" barSize={40} fill="#A30D0D" >
                            {data.map((_, index) => (
                                <Cell key={index}
                                style={{
                                filter: `drop-shadow(5px 7px 3px #10032B)`
                                }}
                                />
                            ))}
                            <LabelList position="right" dataKey="expenses" style={{textShadow:'none', fill:'white', fontFamily:'Gotham Medium', fontSize:'15'}}/>
                        </Bar>
                        <Bar dataKey="income" barSize={40} fill="#20F7C5" >
                            {data.map((_, index) => (
                            <Cell key={index}
                            style={{
                            filter: `drop-shadow(5px 7px 3px #10032B)`
                            }}
                            />
                            ))}
                            <LabelList position="right" dataKey="income" style={{textShadow:'none', fill:'white',fontFamily:'Gotham Medium', fontSize:'15'}}/>
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                </div>         
                <div className='title'>
                    <div className='main-title'>
                        Insights
                    </div>
                </div>
            </div>
            <div className='insights-page-main-charts'>
                <div className='insights-page-main-charts-linear-balance-chart'>
                    {/* <ResponsiveContainer width="100%" height="100%">
                            <LineChart width={500} height={300} data={data}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" hide/>
                        </LineChart>
                    </ResponsiveContainer> */}
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default InsightsPage;