"use client";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  RulerHorizontalIcon,
  SunIcon,
  MixerVerticalIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [allData, setAllData] = useState<any[]>([]);

  const fetchData = async () => {
    const response = await fetch(
      "https://api.thingspeak.com/channels/2299528/feeds.json?results=1"
    );
    const result = await response.json();
    setData(result.feeds);
  };

  const fetchAllData = async () => {
    const response = await fetch(
      "https://api.thingspeak.com/channels/2299528/feeds.json?results=5"
    );
    const result = await response.json();
    setAllData(result.feeds);
  };

  useEffect(() => {
    const inteval = setInterval(() => {
      fetchData();
      fetchAllData();
    }, 5000);
    return () => clearInterval(inteval);
  }, []);

  return (
    <main className="flex flex-col items-center p-10">
      <h1 className="text-3xl">Website Monitoring Sensor AlPro2 TE-4B</h1>
      <h1 className="text-gray-500 text-xl text-center">
        Achmad Satria, Ayudya Sawitri, Marzandi Zahran <br /> 2023
      </h1>
      {data.map((d) => (
        <>
          <h1 className="text-xl text-center my-[40px]">
            Sensor Last Update: {d.created_at}
          </h1>
          <div key={d.entry_id} className="flex gap-4">
            <Card className="w-[350px] text-center">
              <CardHeader>
                <CardTitle className="flex gap-2 justify-center">
                  <RulerHorizontalIcon />
                  Distance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{d.field1} cm</p>
              </CardContent>
            </Card>

            <Card className="w-[350px] text-center">
              <CardHeader>
                <CardTitle className="flex gap-2 justify-center">
                  <MixerVerticalIcon />
                  Temperature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{d.field2} C</p>
              </CardContent>
            </Card>

            <Card className="w-[350px] text-center">
              <CardHeader>
                <CardTitle className="flex gap-2 justify-center">
                  <SunIcon />
                  Light
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{d.field3} lx</p>
              </CardContent>
            </Card>
          </div>
        </>
      ))}

      <div className="flex">
        <iframe
          width="450"
          height="260"
          src="https://thingspeak.com/channels/2299528/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
        ></iframe>

        <iframe
          width="450"
          height="260"
          src="https://thingspeak.com/channels/2299528/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
        ></iframe>
      </div>

      <div>
        <iframe
          width="450"
          height="260"
          src="https://thingspeak.com/channels/2299528/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
        ></iframe>
      </div>

      <div>
        <Table className="w-[900px]">
          <TableCaption>5 data terbaru.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Temperature</TableHead>
              <TableHead>Light</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allData.map((data) => (
              <TableRow key={data.entry_id}>
                <TableCell className="font-medium">{data.created_at}</TableCell>
                <TableCell>{data.field1}</TableCell>
                <TableCell>{data.field2}</TableCell>
                <TableCell>{data.field3}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
