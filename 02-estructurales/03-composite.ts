/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */

interface FileSystemComponent {
    showDetails(indent?: string): void;
  }
  
  class File implements FileSystemComponent {
    private name: string;
    constructor(name: string) {
      this.name = name;
    }
    showDetails(indent?: string): void {
      console.log(`${indent} -Archivo: ${this.name}`);
    }
  }
  
  class Folder implements FileSystemComponent {
    private name: string;
    private files: FileSystemComponent[] = [];
    constructor(name: string) {
      this.name = name;
    }
  
    addComponent(component: FileSystemComponent): void {
      this.files.push(component);
    }
    showDetails(indent: string = " "): void {
      console.log(`${indent} +Folder: ${this.name}`);
      this.files.forEach((file) => {
        file.showDetails(indent + "  ");
      });
    }
  }
  
  function main() {
      const file1 = new File('archivo1.txt');
      const file2 = new File('archivo2.txt');
      const file3 = new File('archivo3.txt');
      const file4 = new File('archivo4.txt');
    
      const folder1 = new Folder('Carpeta 1');
      const folder5 = new Folder('Carpeta 5');
    
      folder1.addComponent(file1);
      folder1.addComponent(file2);
    
      const folder2 = new Folder('Carpeta 2');
      folder2.addComponent(file3);
    
      const folder3 = new Folder('Carpeta 3');
      folder3.addComponent(file4);
      folder2.addComponent(folder3);
      folder2.addComponent(folder5);
    
      const rootFolder = new Folder('Carpeta ROOT');
    
      rootFolder.addComponent(folder1);
      rootFolder.addComponent(folder2);
    
      rootFolder.showDetails();
    }
    
    main();
  