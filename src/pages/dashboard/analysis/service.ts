import { request } from '@umijs/max';
import type { AnalysisData } from './data';

// Sample data for the statistics page

export async function sampleData(): Promise<{ data: AnalysisData }> {
  return request('https://proapi.azurewebsites.net/api/fake_analysis_chart_data');
}
