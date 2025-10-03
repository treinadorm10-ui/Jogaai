"use client";

import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Star, Filter, Plus, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface School {
  id: string;
  name: string;
  shield: string;
  city: string;
  region: string;
  state: string;
  distance: number;
  level: 'Iniciante' | 'Intermediário' | 'Forte';
  rating: number;
  categories: string[];
  availableDates: string[];
  fieldType: 'Campo' | 'Society' | 'Futsal';
  verified: boolean;
}

const mockSchools: School[] = [
  {
    id: '1',
    name: 'Escola de Futebol Flamengo',
    shield: '🔴',
    city: 'Rio de Janeiro',
    region: 'Zona Norte',
    state: 'RJ',
    distance: 2.5,
    level: 'Forte',
    rating: 4.8,
    categories: ['Sub-11', 'Sub-13', 'Sub-15'],
    availableDates: ['15/01', '22/01', '29/01'],
    fieldType: 'Campo',
    verified: true
  },
  {
    id: '2',
    name: 'Academia Vasco da Gama',
    shield: '⚫',
    city: 'Rio de Janeiro',
    region: 'Zona Sul',
    state: 'RJ',
    distance: 5.2,
    level: 'Forte',
    rating: 4.6,
    categories: ['Sub-9', 'Sub-11', 'Sub-13'],
    availableDates: ['16/01', '23/01'],
    fieldType: 'Campo',
    verified: true
  },
  {
    id: '3',
    name: 'Escolinha Botafogo',
    shield: '⚪',
    city: 'Rio de Janeiro',
    region: 'Zona Oeste',
    state: 'RJ',
    distance: 8.1,
    level: 'Intermediário',
    rating: 4.3,
    categories: ['Sub-7', 'Sub-9', 'Sub-11'],
    availableDates: ['17/01', '24/01', '31/01'],
    fieldType: 'Society',
    verified: false
  },
  {
    id: '4',
    name: 'Centro de Treinamento Fluminense',
    shield: '🟢',
    city: 'Niterói',
    region: 'Centro',
    state: 'RJ',
    distance: 12.3,
    level: 'Forte',
    rating: 4.7,
    categories: ['Sub-13', 'Sub-15', 'Sub-17'],
    availableDates: ['18/01', '25/01'],
    fieldType: 'Campo',
    verified: true
  },
  {
    id: '5',
    name: 'Escola Municipal de Futebol',
    shield: '🔵',
    city: 'São Gonçalo',
    region: 'Centro',
    state: 'RJ',
    distance: 18.7,
    level: 'Iniciante',
    rating: 4.1,
    categories: ['Sub-7', 'Sub-9'],
    availableDates: ['19/01', '26/01', '02/02'],
    fieldType: 'Futsal',
    verified: false
  }
];

export default function MatchmakingDashboard() {
  const [selectedState, setSelectedState] = useState('RJ');
  const [selectedCity, setSelectedCity] = useState('Rio de Janeiro');
  const [selectedRegion, setSelectedRegion] = useState('all-regions');
  const [selectedCategory, setSelectedCategory] = useState('all-categories');
  const [selectedLevel, setSelectedLevel] = useState('all-levels');
  const [selectedFieldType, setSelectedFieldType] = useState('all-types');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSchools, setFilteredSchools] = useState(mockSchools);

  const handleSearch = () => {
    let filtered = mockSchools;

    if (selectedRegion && selectedRegion !== 'all-regions') {
      filtered = filtered.filter(school => school.region === selectedRegion);
    }
    if (selectedCategory && selectedCategory !== 'all-categories') {
      filtered = filtered.filter(school => school.categories.includes(selectedCategory));
    }
    if (selectedLevel && selectedLevel !== 'all-levels') {
      filtered = filtered.filter(school => school.level === selectedLevel);
    }
    if (selectedFieldType && selectedFieldType !== 'all-types') {
      filtered = filtered.filter(school => school.fieldType === selectedFieldType);
    }
    if (searchTerm) {
      filtered = filtered.filter(school => 
        school.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSchools(filtered);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800';
      case 'Forte': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚽</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FutBase</h1>
                <p className="text-sm text-gray-500">Super-app do Futebol de Base</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Criar Jogo
              </Button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Encontrar Amistosos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                  <SelectItem value="SP">São Paulo</SelectItem>
                  <SelectItem value="MG">Minas Gerais</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
                  <SelectItem value="Niterói">Niterói</SelectItem>
                  <SelectItem value="São Gonçalo">São Gonçalo</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Região" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-regions">Todas as regiões</SelectItem>
                  <SelectItem value="Zona Norte">Zona Norte</SelectItem>
                  <SelectItem value="Zona Sul">Zona Sul</SelectItem>
                  <SelectItem value="Zona Oeste">Zona Oeste</SelectItem>
                  <SelectItem value="Centro">Centro</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">Todas as categorias</SelectItem>
                  <SelectItem value="Sub-7">Sub-7</SelectItem>
                  <SelectItem value="Sub-9">Sub-9</SelectItem>
                  <SelectItem value="Sub-11">Sub-11</SelectItem>
                  <SelectItem value="Sub-13">Sub-13</SelectItem>
                  <SelectItem value="Sub-15">Sub-15</SelectItem>
                  <SelectItem value="Sub-17">Sub-17</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-levels">Todos os níveis</SelectItem>
                  <SelectItem value="Iniciante">Iniciante</SelectItem>
                  <SelectItem value="Intermediário">Intermediário</SelectItem>
                  <SelectItem value="Forte">Forte</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedFieldType} onValueChange={setSelectedFieldType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Campo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">Todos os tipos</SelectItem>
                  <SelectItem value="Campo">Campo</SelectItem>
                  <SelectItem value="Society">Society</SelectItem>
                  <SelectItem value="Futsal">Futsal</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar escola..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button onClick={handleSearch} className="w-full md:w-auto bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Buscar Escolas
            </Button>
          </CardContent>
        </Card>

        {/* Resultados */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Escolas Disponíveis ({filteredSchools.length})
          </h2>
          <p className="text-gray-600">
            Encontre a escola perfeita para marcar seu próximo amistoso
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <Card key={school.id} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                      {school.shield}
                    </div>
                    <div>
                      <CardTitle className="text-lg leading-tight">{school.name}</CardTitle>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {school.region}, {school.city}
                      </div>
                    </div>
                  </div>
                  {school.verified && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Verificado
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{school.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {school.distance} km
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge className={getLevelColor(school.level)}>
                    {school.level}
                  </Badge>
                  <Badge variant="outline">
                    {school.fieldType}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Categorias:</p>
                  <div className="flex flex-wrap gap-1">
                    {school.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Datas disponíveis:</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{school.availableDates.join(', ')}</span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Propor Jogo
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma escola encontrada
            </h3>
            <p className="text-gray-500 mb-4">
              Tente ajustar os filtros para encontrar mais opções
            </p>
            <Button variant="outline" onClick={() => {
              setSelectedRegion('all-regions');
              setSelectedCategory('all-categories');
              setSelectedLevel('all-levels');
              setSelectedFieldType('all-types');
              setSearchTerm('');
              setFilteredSchools(mockSchools);
            }}>
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}