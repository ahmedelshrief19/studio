'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Loader2, Play, Pause, RefreshCw } from 'lucide-react';

interface AyahData {
  text: string;
  translation: string;
  surah: string;
  numberInSurah: number;
  audio: string;
}

const getRandomAyahNumber = () => Math.floor(Math.random() * 6236) + 1;

export function QuranPlayer() {
  const [ayahData, setAyahData] = useState<AyahData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fetchRandomAyah = async () => {
    setIsLoading(true);
    setAyahData(null);
    try {
      const randomAyah = getRandomAyahNumber();
      const response = await fetch(`https://api.alquran.cloud/v1/ayah/${randomAyah}/en.sahih,ar.alafasy`);
      if (!response.ok) {
        throw new Error('Failed to fetch Ayah');
      }
      const data = await response.json();
      
      const arabicData = data.data.find((d: any) => d.edition.identifier === 'ar.alafasy');
      const englishData = data.data.find((d: any) => d.edition.identifier === 'en.sahih');
      
      setAyahData({
        text: arabicData.text,
        translation: englishData.text,
        surah: arabicData.surah.englishName,
        numberInSurah: arabicData.numberInSurah,
        audio: arabicData.audio,
      });

      if (audioRef.current) {
        audioRef.current.src = arabicData.audio;
        audioRef.current.pause();
        setIsPlaying(false);
      }
      
    } catch (error) {
      console.error(error);
      // You could set an error state here to display to the user
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomAyah();
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', onEnded);
    
    return () => {
      audio.removeEventListener('ended', onEnded);
    };
  }, []);
  
  return (
    <Card className="w-full max-w-lg mx-auto bg-card">
      <CardHeader>
        <CardTitle>Quran Player</CardTitle>
        <CardDescription>Listen to a random verse from the Holy Quran.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[250px] flex items-center justify-center p-6">
        {isLoading ? (
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        ) : ayahData ? (
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">{`Surah ${ayahData.surah}, Verse ${ayahData.numberInSurah}`}</p>
            <p dir="rtl" className="text-3xl font-headline leading-relaxed">{ayahData.text}</p>
            <p className="text-base text-muted-foreground leading-relaxed">{ayahData.translation}</p>
          </div>
        ) : (
          <p>Could not load verse. Please try again.</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button onClick={fetchRandomAyah} disabled={isLoading} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> New Verse
        </Button>
        <Button onClick={handlePlayPause} disabled={!ayahData || isLoading}>
          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      </CardFooter>
    </Card>
  );
}
