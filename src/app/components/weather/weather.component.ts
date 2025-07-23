// src/app/components/weather/weather.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  private weatherService = inject(WeatherService);
  weatherData: any = null;
  topWeatherData: any = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  private readonly latitude = 47.4979; // Budapest latitude
  private readonly longitude = 19.0402; // Budapest longitude

  ngOnInit(): void {
    this.fetchWeather();
  }

  private fetchWeather(): void {
    this.weatherService.getWeather(this.latitude, this.longitude).subscribe({
      next: (response) => {
        console.log('Weather API Response:', response);

        this.weatherData = response.hourly || null; // Full hourly weather data

        // Extract the first 10 data points for time, temperature, and precipitation
        this.topWeatherData = {
          time: this.weatherData.time.slice(0, 23),
          temperature_2m: this.weatherData.temperature_2m.slice(0, 23),
          precipitation: this.weatherData.precipitation.slice(0, 23),
        };
        console.log('Top Weather Data:', this.topWeatherData);

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching weather:', err);
        this.errorMessage = 'Failed to load weather data.';
        this.isLoading = false;
      },
    });
  }
}
