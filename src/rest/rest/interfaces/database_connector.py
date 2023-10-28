from abc import ABC, abstractmethod

class DataBaseConnector(ABC):   

    @abstractmethod
    def get_instance(self):
        pass