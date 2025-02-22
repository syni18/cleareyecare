import React from 'react'
import './sizechart.css';
import { Minimize2 } from 'lucide-react';

function SizeChart() {
  return (
    <div className="size-chart-wrapper">
      <div className="size-chart-container">
        <div className="chart-label-closebtn">
          <label htmlFor="">Size chart</label>
          <Minimize2 className='chart-close-icon' />
        </div>
        <div className="size-chart-table">
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Waist</th>
                <th>Brand size</th>
                <th>Length</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>S</td>
                <td>28</td>
                <td>28</td>
                <td>40</td>
              </tr>
              <tr>
                <td>M</td>
                <td>30</td>
                <td>30</td>
                <td>40</td>
              </tr>
              <tr>
                <td>L</td>
                <td>32</td>
                <td>32</td>
                <td>40</td>
              </tr>
              <tr>
                <td>XL</td>
                <td>34</td>
                <td>34</td>
                <td>40</td>
              </tr>
              <tr>
                <td>XXL</td>
                <td>36</td>
                <td>36</td>
                <td>40</td>
              </tr>
            </tbody>
          </table>
          <div className="size-chart-term">
            <div className="chart-term-waist">
              <p>
                <label htmlFor="">Waist : </label>
                Measure around the body at the natural waistline (where you wear
                your belt).
              </p>
            </div>
            <div className="chart-term-length">
              <p>
                <label htmlFor="">Length: </label>
                Measure from the top of the waistband through the bottom hem of
                the garments
              </p>
            </div>
            <div className="chart-term-inseam">
              <p>
                <label htmlFor="">Inseam Length : </label>
                Measure from the crotch to the inside bottom of the leg.
              </p>
            </div>
            <div className="chart-term-rise">
              <p>
                <label htmlFor="">Rise : </label>
                Measure from the crotch to the top of the waistband.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SizeChart