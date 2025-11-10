'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Loader2, BookOpen } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { adhkar } from '@/lib/adhkar';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
}

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
}

export function QuranPlayer() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [surahContent, setSurahContent] = useState<Ayah[]>([]);
  const [isLoadingSurahs, setIsLoadingSurahs] = useState(true);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  useEffect(() => {
    const fetchSurahs = async () => {
      setIsLoadingSurahs(true);
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        if (!response.ok) throw new Error('Failed to fetch Surahs');
        const data = await response.json();
        setSurahs(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingSurahs(false);
      }
    };
    fetchSurahs();
  }, []);

  const handleSurahChange = async (surahNumber: string) => {
    if (!surahNumber) return;
    setIsLoadingContent(true);
    setSurahContent([]);
    const surah = surahs.find(s => s.number === parseInt(surahNumber));
    setSelectedSurah(surah || null);
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
      if (!response.ok) throw new Error('Failed to fetch Surah content');
      const data = await response.json();
      setSurahContent(data.data.ayahs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingContent(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card">
      <CardHeader>
        <CardTitle>Quran & Adhkar</CardTitle>
        <CardDescription>Read the Holy Quran and daily remembrances.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="quran" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quran">Quran</TabsTrigger>
            <TabsTrigger value="adhkar">Adhkar</TabsTrigger>
          </TabsList>
          <TabsContent value="quran">
            <div className="flex flex-col gap-4 pt-4">
              <Select onValueChange={handleSurahChange} disabled={isLoadingSurahs}>
                <SelectTrigger>
                  <SelectValue placeholder={isLoadingSurahs ? "Loading Surahs..." : "Select a Surah"} />
                </SelectTrigger>
                <SelectContent>
                  {surahs.map(surah => (
                    <SelectItem key={surah.number} value={String(surah.number)}>
                      {surah.number}. {surah.englishName} ({surah.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {isLoadingContent ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  </div>
                ) : surahContent.length > 0 ? (
                  <div className="text-right space-y-6" dir="rtl">
                    <h3 className='text-center text-2xl font-headline mb-4'>{selectedSurah?.name}</h3>
                    {selectedSurah?.number !== 1 && selectedSurah?.number !== 9 && (
                       <p className="text-center text-xl font-headline">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                    )}
                    {surahContent.map(ayah => (
                      <p key={ayah.number} className="text-xl font-arabic leading-relaxed">
                        {ayah.text} <span className="text-sm text-accent">({ayah.numberInSurah})</span>
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <BookOpen className="h-12 w-12 mb-4" />
                    <p>Please select a Surah to begin reading.</p>
                  </div>
                )}
              </ScrollArea>
            </div>
          </TabsContent>
          <TabsContent value="adhkar">
             <ScrollArea className="h-[450px] w-full rounded-md p-1 mt-4">
                <div className="space-y-8 text-right" dir="rtl">
                    <div>
                        <h3 className="text-2xl font-headline text-accent border-b-2 border-accent/50 pb-2 mb-4">أذكار الصباح</h3>
                        <div className="space-y-6">
                            {adhkar.morning.map((zikr, index) => (
                                <div key={`morning-${index}`} className="p-4 bg-background/50 rounded-lg">
                                    <p className="text-lg font-arabic leading-relaxed mb-2">{zikr.zikr}</p>
                                    <p className="text-sm text-muted-foreground">{zikr.repeat}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="text-2xl font-headline text-accent border-b-2 border-accent/50 pb-2 mb-4">أذكار المساء</h3>
                        <div className="space-y-6">
                            {adhkar.evening.map((zikr, index) => (
                                <div key={`evening-${index}`} className="p-4 bg-background/50 rounded-lg">
                                    <p className="text-lg font-arabic leading-relaxed mb-2">{zikr.zikr}</p>
                                    <p className="text-sm text-muted-foreground">{zikr.repeat}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
