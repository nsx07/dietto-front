"use client";

import { useState } from "react";
import { Plus, Save, Trash2, Edit, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tipos
type FoodItem = {
  id: string;
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type Meal = {
  id: string;
  name: string;
  time: string;
  foods: FoodItem[];
};

type Patient = {
  name: string;
  age: string;
  height: string;
  weight: string;
  healthNotes: string;
};

type NutritionPlan = {
  id: string;
  patient: Patient;
  meals: Meal[];
  notes: string;
  createdAt: string;
};

export default function NutritionApp() {
  // Estado
  const [patient, setPatient] = useState<Patient>({
    name: "",
    age: "",
    height: "",
    weight: "",
    healthNotes: "",
  });

  const [meals, setMeals] = useState<Meal[]>([
    {
      id: "1",
      name: "Café da Manhã",
      time: "08:00",
      foods: [],
    },
  ]);

  const [notes, setNotes] = useState("");
  const [editingFood, setEditingFood] = useState<{
    mealId: string;
    food: FoodItem | null;
  }>({ mealId: "", food: null });
  const [savedPlans, setSavedPlans] = useState<NutritionPlan[]>([]);

  // Manipuladores
  const handlePatientChange = (field: keyof Patient, value: string) => {
    setPatient((prev) => ({ ...prev, [field]: value }));
  };

  const addMeal = () => {
    const newMeal: Meal = {
      id: Date.now().toString(),
      name: `Refeição ${meals.length + 1}`,
      time: "",
      foods: [],
    };
    setMeals([...meals, newMeal]);
  };

  const updateMeal = (id: string, field: keyof Meal, value: string) => {
    setMeals(
      meals.map((meal) => (meal.id === id ? { ...meal, [field]: value } : meal))
    );
  };

  const removeMeal = (id: string) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  const addFood = (mealId: string) => {
    const newFood: FoodItem = {
      id: Date.now().toString(),
      name: "",
      portion: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };

    setEditingFood({ mealId, food: newFood });
  };

  const saveFood = () => {
    if (!editingFood.food || !editingFood.mealId) return;

    setMeals(
      meals.map((meal) => {
        if (meal.id === editingFood.mealId) {
          // Se estiver editando um alimento existente
          if (meal.foods.some((f) => f.id === editingFood.food?.id)) {
            return {
              ...meal,
              foods: meal.foods.map((f) =>
                f.id === editingFood.food?.id ? editingFood.food! : f
              ),
            };
          }
          // Se estiver adicionando um novo alimento
          else {
            return {
              ...meal,
              foods: [...meal.foods, editingFood.food],
            };
          }
        }
        return meal;
      })
    );

    setEditingFood({ mealId: "", food: null });
  };

  const editFood = (mealId: string, foodId: string) => {
    const meal = meals.find((m) => m.id === mealId);
    if (!meal) return;

    const food = meal.foods.find((f) => f.id === foodId);
    if (!food) return;

    setEditingFood({ mealId, food });
  };

  const removeFood = (mealId: string, foodId: string) => {
    setMeals(
      meals.map((meal) =>
        meal.id === mealId
          ? { ...meal, foods: meal.foods.filter((f) => f.id !== foodId) }
          : meal
      )
    );
  };

  const updateEditingFood = (field: keyof FoodItem, value: string | number) => {
    if (!editingFood.food) return;

    setEditingFood({
      ...editingFood,
      food: { ...editingFood.food, [field]: value },
    });
  };

  const savePlan = () => {
    const newPlan: NutritionPlan = {
      id: Date.now().toString(),
      patient,
      meals,
      notes,
      createdAt: new Date().toISOString(),
    };

    setSavedPlans([...savedPlans, newPlan]);
    alert("Plano nutricional salvo com sucesso!");
  };

  const loadPlan = (plan: NutritionPlan) => {
    setPatient(plan.patient);
    setMeals(plan.meals);
    setNotes(plan.notes);
  };

  // Calcular totais
  const calculateMealTotals = (foods: FoodItem[]) => {
    return foods.reduce(
      (acc, food) => {
        return {
          calories: acc.calories + food.calories,
          protein: acc.protein + food.protein,
          carbs: acc.carbs + food.carbs,
          fat: acc.fat + food.fat,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const calculateDailyTotals = () => {
    return meals.reduce(
      (acc, meal) => {
        const mealTotals = calculateMealTotals(meal.foods);
        return {
          calories: acc.calories + mealTotals.calories,
          protein: acc.protein + mealTotals.protein,
          carbs: acc.carbs + mealTotals.carbs,
          fat: acc.fat + mealTotals.fat,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const dailyTotals = calculateDailyTotals();

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Criador de Plano Nutricional</h1>
          <div className="flex gap-2">
            <Button onClick={savePlan} variant="default">
              <Save className="mr-2 h-4 w-4" />
              Salvar Plano
            </Button>
            <Select
              onValueChange={(value) => {
                const plan = savedPlans.find((p) => p.id === value);
                if (plan) loadPlan(plan);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Carregar Plano" />
              </SelectTrigger>
              <SelectContent>
                {savedPlans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.patient.name} -{" "}
                    {new Date(plan.createdAt).toLocaleDateString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <Tabs defaultValue="plan" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plan">Plano Nutricional</TabsTrigger>
          <TabsTrigger value="patient">Informações do Paciente</TabsTrigger>
        </TabsList>

        <TabsContent value="patient" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Paciente</CardTitle>
              <CardDescription>
                Insira os detalhes e informações de saúde do paciente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={patient.name}
                    onChange={(e) =>
                      handlePatientChange("name", e.target.value)
                    }
                    placeholder="Nome completo do paciente"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    value={patient.age}
                    onChange={(e) => handlePatientChange("age", e.target.value)}
                    placeholder="Idade do paciente"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura</Label>
                  <Input
                    id="height"
                    value={patient.height}
                    onChange={(e) =>
                      handlePatientChange("height", e.target.value)
                    }
                    placeholder="Altura (cm)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso</Label>
                  <Input
                    id="weight"
                    value={patient.weight}
                    onChange={(e) =>
                      handlePatientChange("weight", e.target.value)
                    }
                    placeholder="Peso (kg)"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="healthNotes">Observações de Saúde</Label>
                <Textarea
                  id="healthNotes"
                  value={patient.healthNotes}
                  onChange={(e) =>
                    handlePatientChange("healthNotes", e.target.value)
                  }
                  placeholder="Alergias, condições médicas, restrições alimentares, etc."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plan" className="space-y-6">
          {/* Seção de Refeições */}
          {meals.map((meal) => (
            <Card key={meal.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="space-y-1">
                      <Input
                        value={meal.name}
                        onChange={(e) =>
                          updateMeal(meal.id, "name", e.target.value)
                        }
                        className="text-xl font-semibold h-8 px-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`time-${meal.id}`} className="text-sm">
                        Horário:
                      </Label>
                      <Input
                        id={`time-${meal.id}`}
                        type="time"
                        value={meal.time}
                        onChange={(e) =>
                          updateMeal(meal.id, "time", e.target.value)
                        }
                        className="w-32 h-8"
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMeal(meal.id)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {meal.foods.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Alimento</th>
                          <th className="text-left py-2">Porção</th>
                          <th className="text-right py-2">Calorias</th>
                          <th className="text-right py-2">Proteína (g)</th>
                          <th className="text-right py-2">Carboidratos (g)</th>
                          <th className="text-right py-2">Gordura (g)</th>
                          <th className="text-right py-2">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {meal.foods.map((food) => (
                          <tr key={food.id} className="border-b">
                            <td className="py-2">{food.name}</td>
                            <td className="py-2">{food.portion}</td>
                            <td className="text-right py-2">{food.calories}</td>
                            <td className="text-right py-2">{food.protein}</td>
                            <td className="text-right py-2">{food.carbs}</td>
                            <td className="text-right py-2">{food.fat}</td>
                            <td className="text-right py-2">
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => editFood(meal.id, food.id)}
                                  className="h-7 w-7"
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeFood(meal.id, food.id)}
                                  className="h-7 w-7"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        <tr className="font-medium">
                          <td colSpan={2} className="py-2">
                            Total
                          </td>
                          <td className="text-right py-2">
                            {calculateMealTotals(meal.foods).calories}
                          </td>
                          <td className="text-right py-2">
                            {calculateMealTotals(meal.foods).protein}
                          </td>
                          <td className="text-right py-2">
                            {calculateMealTotals(meal.foods).carbs}
                          </td>
                          <td className="text-right py-2">
                            {calculateMealTotals(meal.foods).fat}
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    Nenhum alimento adicionado a esta refeição ainda
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addFood(meal.id)}
                  className="mt-4"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Alimento
                </Button>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between">
            <Button variant="outline" onClick={addMeal}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Refeição
            </Button>

            <Card className="w-64">
              <CardHeader className="py-2">
                <CardTitle className="text-lg">Totais Diários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Calorias:</span>
                    <span className="font-medium">{dailyTotals.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Proteína:</span>
                    <span className="font-medium">{dailyTotals.protein}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carboidratos:</span>
                    <span className="font-medium">{dailyTotals.carbs}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gordura:</span>
                    <span className="font-medium">{dailyTotals.fat}g</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Observações Adicionais</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Adicione quaisquer observações adicionais sobre este plano nutricional..."
                rows={4}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Edição de Alimentos */}
      {editingFood.food && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>
                {editingFood.food.id ? "Editar Alimento" : "Adicionar Alimento"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="food-name">Nome do Alimento</Label>
                <Input
                  id="food-name"
                  value={editingFood.food.name}
                  onChange={(e) => updateEditingFood("name", e.target.value)}
                  placeholder="ex., Peito de Frango"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="food-portion">Tamanho da Porção</Label>
                <Input
                  id="food-portion"
                  value={editingFood.food.portion}
                  onChange={(e) => updateEditingFood("portion", e.target.value)}
                  placeholder="ex., 100g, 1 xícara"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="food-calories">Calorias</Label>
                  <Input
                    id="food-calories"
                    type="number"
                    value={editingFood.food.calories}
                    onChange={(e) =>
                      updateEditingFood("calories", Number(e.target.value))
                    }
                    placeholder="kcal"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="food-protein">Proteína (g)</Label>
                  <Input
                    id="food-protein"
                    type="number"
                    value={editingFood.food.protein}
                    onChange={(e) =>
                      updateEditingFood("protein", Number(e.target.value))
                    }
                    placeholder="gramas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="food-carbs">Carboidratos (g)</Label>
                  <Input
                    id="food-carbs"
                    type="number"
                    value={editingFood.food.carbs}
                    onChange={(e) =>
                      updateEditingFood("carbs", Number(e.target.value))
                    }
                    placeholder="gramas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="food-fat">Gordura (g)</Label>
                  <Input
                    id="food-fat"
                    type="number"
                    value={editingFood.food.fat}
                    onChange={(e) =>
                      updateEditingFood("fat", Number(e.target.value))
                    }
                    placeholder="gramas"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setEditingFood({ mealId: "", food: null })}
              >
                Cancelar
              </Button>
              <Button onClick={saveFood}>
                <Check className="mr-2 h-4 w-4" />
                Salvar
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
