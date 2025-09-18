'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Button } from '../../components';
import { addToCart } from '../../store/slices/cartSlice';
import { formatPrice } from '../../utils/price';

interface PCComponent {
  id: string;
  name: string;
  price: number;
  category: string;
  specs: string;
  compatible: boolean;
}

interface PCBuild {
  cpu?: PCComponent;
  motherboard?: PCComponent;
  ram?: PCComponent;
  gpu?: PCComponent;
  storage?: PCComponent;
  psu?: PCComponent;
  case?: PCComponent;
}

export default function BuildPCPage() {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [build, setBuild] = useState<PCBuild>({});

  const steps = [
    { name: 'CPU', category: 'cpu' },
    { name: 'Motherboard', category: 'motherboard' },
    { name: 'RAM', category: 'ram' },
    { name: 'Graphics Card', category: 'gpu' },
    { name: 'Storage', category: 'storage' },
    { name: 'Power Supply', category: 'psu' },
    { name: 'Case', category: 'case' },
    { name: 'Summary', category: 'summary' },
  ];

  // Mock component data
  const components: Record<string, PCComponent[]> = {
    cpu: [
      { id: 'cpu1', name: 'AMD Ryzen 5 5600X', price: 19999, category: 'cpu', specs: '6 cores, 12 threads, 3.7GHz base', compatible: true },
      { id: 'cpu2', name: 'Intel Core i5-12600K', price: 24999, category: 'cpu', specs: '6 cores, 12 threads, 3.7GHz base', compatible: true },
      { id: 'cpu3', name: 'AMD Ryzen 7 5800X', price: 29999, category: 'cpu', specs: '8 cores, 16 threads, 3.8GHz base', compatible: true },
    ],
    motherboard: [
      { id: 'mb1', name: 'ASUS Prime B550', price: 12999, category: 'motherboard', specs: 'AM4 socket, PCIe 4.0, USB 3.2', compatible: true },
      { id: 'mb2', name: 'MSI MAG B660', price: 14999, category: 'motherboard', specs: 'LGA1700 socket, PCIe 5.0, WiFi 6', compatible: true },
    ],
    ram: [
      { id: 'ram1', name: 'Corsair Vengeance 16GB DDR4', price: 7999, category: 'ram', specs: '16GB (2x8GB), 3200MHz, CL16', compatible: true },
      { id: 'ram2', name: 'G.Skill Ripjaws 32GB DDR4', price: 13999, category: 'ram', specs: '32GB (2x16GB), 3600MHz, CL16', compatible: true },
    ],
    gpu: [
      { id: 'gpu1', name: 'NVIDIA RTX 4060', price: 34999, category: 'gpu', specs: '8GB GDDR6, 128-bit, PCIe 4.0', compatible: true },
      { id: 'gpu2', name: 'AMD RX 6700 XT', price: 39999, category: 'gpu', specs: '12GB GDDR6, 192-bit, PCIe 4.0', compatible: true },
    ],
    storage: [
      { id: 'ssd1', name: 'Samsung 970 EVO 500GB', price: 6999, category: 'storage', specs: 'NVMe PCIe 3.0, Read: 3400MB/s', compatible: true },
      { id: 'ssd2', name: 'WD Black SN850 1TB', price: 11999, category: 'storage', specs: 'NVMe PCIe 4.0, Read: 7000MB/s', compatible: true },
    ],
    psu: [
      { id: 'psu1', name: 'Corsair RM650x', price: 10999, category: 'psu', specs: '650W, 80+ Gold, Modular', compatible: true },
      { id: 'psu2', name: 'EVGA SuperNOVA 750', price: 12999, category: 'psu', specs: '750W, 80+ Gold, Modular', compatible: true },
    ],
    case: [
      { id: 'case1', name: 'Fractal Design Meshify C', price: 8999, category: 'case', specs: 'Mid Tower, Tempered Glass, USB-C', compatible: true },
      { id: 'case2', name: 'Corsair 4000D Airflow', price: 9999, category: 'case', specs: 'Mid Tower, Tempered Glass, USB-C', compatible: true },
    ],
  };

  const selectComponent = (component: PCComponent) => {
    setBuild(prev => ({
      ...prev,
      [steps[currentStep].category]: component,
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateTotal = () => {
    return Object.values(build).reduce((total, component) => {
      return total + (component?.price || 0);
    }, 0);
  };

  const addBuildToCart = () => {
    // Mock adding the entire build as a single cart item
    const buildSummary = Object.values(build)
      .filter(component => component)
      .map(component => component!.name)
      .join(', ');

    dispatch(addToCart({
      product: {
        id: 'custom-pc-build',
        name: 'Custom PC Build',
        description: `Custom PC Build: ${buildSummary}`,
        price: calculateTotal(),
        image: '/images/custom-pc.jpg',
        category: 'Custom Builds',
        stock: 1,
      },
      quantity: 1,
    }));

    alert('Custom PC build added to cart!');
  };

  const currentCategory = steps[currentStep].category;
  const currentComponents = components[currentCategory] || [];

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Build Your Own PC</h1>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.name} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`ml-2 ${index === currentStep ? 'font-semibold' : ''}`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${index < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep < steps.length - 1 ? (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Select {steps[currentStep].name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentComponents.map((component) => (
                    <div
                      key={component.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          (build as any)[currentCategory]?.id === component.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      onClick={() => selectComponent(component)}
                    >
                      <h3 className="font-semibold mb-2">{component.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{component.specs}</p>
                      <p className="text-lg font-bold text-blue-600">{formatPrice(component.price)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Build Summary</h2>
                <div className="space-y-4">
                  {Object.entries(build).map(([category, component]) => (
                    component && (
                      <div key={category} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{component.name}</p>
                          <p className="text-sm text-gray-600 capitalize">{category}</p>
                        </div>
                        <p className="font-semibold">{formatPrice(component.price)}</p>
                      </div>
                    )
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Current Build</h3>
              <div className="space-y-2 mb-4">
                {Object.entries(build).map(([category, component]) => (
                  component ? (
                    <div key={category} className="flex justify-between text-sm">
                      <span className="capitalize">{category}:</span>
                      <span className="font-medium">{formatPrice(component.price)}</span>
                    </div>
                  ) : (
                    <div key={category} className="flex justify-between text-sm text-gray-500">
                      <span className="capitalize">{category}:</span>
                      <span>Not selected</span>
                    </div>
                  )
                ))}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="secondary"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={nextStep}
              disabled={!(build as any)[currentCategory]}
            >
              Next
            </Button>
          ) : (
            <div className="space-x-4">
              <Button variant="secondary">
                <Link href="/">Save Build</Link>
              </Button>
              <Button onClick={addBuildToCart}>
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}