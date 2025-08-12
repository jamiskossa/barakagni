"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

type ApplicationStatsData = {
  jobTitle: string;
  applications: number;
}

interface ApplicationStatsProps {
  data: ApplicationStatsData[];
}

export function ApplicationStats({ data }: ApplicationStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Répartition des candidatures</CardTitle>
        <CardDescription>Nombre de candidatures reçues pour chaque offre d'emploi.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 70 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="jobTitle"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval={0}
              angle={-45}
              textAnchor="end"
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
             <Tooltip
                cursor={{ fill: 'hsl(var(--accent))', opacity: 0.1 }}
                contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                itemStyle={{ color: 'hsl(var(--accent))' }}
            />
            <Legend 
                wrapperStyle={{ fontSize: "14px", paddingTop: '20px' }} 
                formatter={(value) => <span className="text-muted-foreground">{value}</span>}
            />
            <Bar dataKey="applications" name="Candidatures" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
