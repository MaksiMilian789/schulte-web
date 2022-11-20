import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { showHideAnimation } from '../shared/animations/showHide';
import { httpAllResults, httpResults } from '../shared/models/results';
import { HttpService } from '../shared/services/http-service.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  animations: [showHideAnimation],
})
export class StatisticsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchControl = new FormControl('');

  private _destroy$ = new Subject<void>();

  //колонки таблицы
  displayedColumns: string[] = [
    'fio',
    'time',
    'mistakes',
    'date',
    'efficiency',
    'workability',
    'sustainability',
  ];

  dataSource!: MatTableDataSource<httpAllResults>;

  constructor(public dialog: MatDialog, private _httpService: HttpService) {
    this.searchControl.disable();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._destroy$)
      )
      .subscribe((filterValue) => this.applyFilter(filterValue));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Количество элементов на странице';
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  loadData(): void {
    this._httpService
      .getResult()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  resultText(field: string, value: number): string {
    switch (field) {
      case 'workability':
        return value >= 1
          ? 'Долго сосредотачивается на основной работе'
          : 'Быстро сосредотачивается на основной работе';
      case 'sustainability':
        return value >= 1
          ? 'Низкая психическая устойчивость'
          : 'Хорошая психическая устойчивость';
    }
    return '';
  }

  /**
   * Открыть поиск
   */
  openSearch(): void {
    this.searchControl.enable();
  }

  /**
   * Закрыть поиск
   */
  closeSearch(): void {
    this.searchControl.setValue('');
    this.searchControl.disable();
  }
}
